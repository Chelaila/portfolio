# PubSub Integration Plan

Documento de planificación para integrar sistemas de mensajería/eventos en el portfolio.

---

## Contexto y Objetivo

El portfolio puede beneficiarse de un sistema de mensajería para:

- **Notificaciones en tiempo real** (ej: formulario de contacto → notificación inmediata)
- **Analytics de visitas** sin bloquear el render
- **Pipeline de CV/descargas** con tracking asíncrono
- **Webhooks de GitHub** para mostrar actividad reciente en tiempo real
- **Demo interactiva** de capacidades técnicas para recruiters

---

## Opciones Evaluadas

### 1. Apache Kafka

| Atributo | Valor |
|---|---|
| Tipo | Log distribuido, alta durabilidad |
| Throughput | Muy alto (millones msg/seg) |
| Latencia | Baja (ms) |
| Retención | Configurable (días/semanas) |
| Complejidad operacional | Alta |
| Costo mínimo | ~$15-30/mes (cloud managed) |

**Casos de uso ideales para este proyecto:**
- Demo de arquitectura event-driven ante empresas que usan Kafka
- Tracking de interacciones con durabilidad completa
- Stream de eventos de GitHub Activity → portfolio live feed

**Librerías Node.js:**
```
kafkajs          # cliente oficial más usado
@confluentinc/kafka-javascript  # cliente oficial Confluent
```

**Proveedores managed:**
- Confluent Cloud (free tier: 10GB/mes)
- Upstash Kafka (serverless, pago por uso — recomendado para portfolio)
- AWS MSK, Aiven

---

### 2. Redis Pub/Sub

| Atributo | Valor |
|---|---|
| Tipo | In-memory, fire-and-forget |
| Throughput | Alto |
| Latencia | Muy baja (<1ms) |
| Retención | Ninguna (sin consumidor activo = mensaje perdido) |
| Complejidad operacional | Baja |
| Costo mínimo | Free tier disponible |

**Casos de uso ideales:**
- Live visitor counter en el portfolio
- Notificaciones push (ej: nuevo mensaje de contacto)
- Cache invalidation events

**Con Redis Streams** (alternativa persistente dentro de Redis):
- Similar a Kafka pero más simple
- Grupos de consumidores
- Persistencia opcional

**Librerías Node.js:**
```
ioredis          # cliente completo con Pub/Sub y Streams
@upstash/redis   # SDK para Upstash (serverless)
```

**Proveedores:**
- Upstash Redis (free tier: 10.000 req/día — recomendado)
- Redis Cloud
- Vercel KV (basado en Upstash)

---

### 3. RabbitMQ / AMQP

| Atributo | Valor |
|---|---|
| Tipo | Message broker, orientado a colas |
| Throughput | Medio-alto |
| Latencia | Baja |
| Retención | Hasta que el consumidor ack |
| Complejidad operacional | Media |
| Patrones | Direct, Topic, Fanout, Headers |

**Casos de uso ideales:**
- Work queues (envío de emails, procesamiento de CV)
- Routing por topic (separar eventos de analytics vs contacto)
- Demo de patrones Enterprise Integration

**Librerías Node.js:**
```
amqplib          # cliente AMQP 0-9-1
@cloudamqp/amqp-client  # para CloudAMQP
```

**Proveedores:**
- CloudAMQP (free tier: 1M msgs/mes)
- AWS AmazonMQ

---

### 4. NATS

| Atributo | Valor |
|---|---|
| Tipo | Cloud-native messaging |
| Throughput | Muy alto |
| Latencia | Muy baja |
| Modos | Core NATS (fire-forget), JetStream (persistente) |
| Complejidad operacional | Baja-Media |
| Costo mínimo | Synadia Cloud free tier |

**Casos de uso ideales:**
- Arquitecturas microservicios ligeras
- Request-reply patterns
- Edge/IoT scenarios

**Librerías Node.js:**
```
nats             # cliente oficial
```

---

### 5. WebSockets / SSE (sin broker externo)

Para casos donde el portfolio es fullstack con Next.js:

| Tecnología | Caso |
|---|---|
| `Socket.io` | Bidireccional, reconexión automática |
| SSE (EventSource) | Unidireccional servidor→cliente, nativo HTTP |
| Pusher / Ably | Managed WebSockets, SDK simple |
| Vercel KV + polling | Más simple, sin WebSocket |

---

## Comparativa de Decisión

```
                    ┌──────────────────────────────────────────────┐
                    │         MATRIZ DE SELECCIÓN                  │
                    ├──────────┬───────┬──────┬──────┬─────────────┤
                    │          │ Kafka │Redis │AMQP  │ NATS        │
                    ├──────────┼───────┼──────┼──────┼─────────────┤
                    │Simplicidad│  ★★   │ ★★★★ │ ★★★  │ ★★★★        │
                    │Durabilidad│ ★★★★★ │ ★★   │ ★★★★ │ ★★★★        │
                    │Free Tier │  ★★★  │ ★★★★ │ ★★★★ │ ★★★         │
                    │Demo value │ ★★★★★ │ ★★★  │ ★★★  │ ★★          │
                    │Serverless │  ★★★  │ ★★★★ │ ★★   │ ★★          │
                    └──────────┴───────┴──────┴──────┴─────────────┘
```

**Recomendación por caso de uso:**

| Necesidad | Tecnología elegida | Justificación |
|---|---|---|
| Notificaciones de contacto | Redis Pub/Sub (Upstash) | Sin servidor, free tier, inmediato |
| Analytics de visitas | Kafka (Upstash) | Demo técnico de alto impacto |
| Email en background | RabbitMQ (CloudAMQP) | Work queue idiomático |
| Live feed GitHub | SSE + Redis | Simple, sin overhead |

---

## Arquitectura Propuesta (Portfolio)

```
                  ┌─────────────┐
                  │   Browser   │
                  └──────┬──────┘
                         │ HTTP / WebSocket
                  ┌──────▼──────┐
                  │  Next.js    │
                  │  (App Router│
                  │  + API Routes)
                  └──┬─────┬───┘
                     │     │
          ┌──────────▼──┐ ┌▼──────────────┐
          │  Upstash    │ │  Upstash       │
          │  Redis      │ │  Kafka         │
          │  Pub/Sub    │ │  (analytics)   │
          └──────┬──────┘ └───────────────┘
                 │
          ┌──────▼──────┐
          │  Email /    │
          │  Webhook    │
          └─────────────┘
```

---

## Plan de Implementación

### Fase 1 — Fundación (sin broker externo)
- [ ] Server-Sent Events para live feed de GitHub activity
- [ ] API Route `/api/contact` → email directo (Resend/Nodemailer)
- [ ] Vercel Analytics para métricas básicas

### Fase 2 — Redis Pub/Sub
- [ ] Configurar Upstash Redis
- [ ] Publisher en `/api/contact` al recibir mensaje
- [ ] Subscriber en background worker → dispara email/Slack
- [ ] Live visitor counter con Redis + SSE

### Fase 3 — Kafka (demo técnico)
- [ ] Configurar Upstash Kafka
- [ ] Topic `portfolio.events` con eventos tipados
- [ ] Consumer en API Route con streaming
- [ ] Dashboard de analytics en tiempo real (visible en portfolio)

### Fase 4 — Múltiple brokers (showcase)
- [ ] Adapter pattern que abstrae el broker
- [ ] Página `/demo/messaging` mostrando latencias comparadas
- [ ] Diagrama interactivo de la arquitectura

---

## Estructura de Archivos Propuesta

```
src/
├── lib/
│   └── messaging/
│       ├── index.ts          # export principal, selecciona impl
│       ├── types.ts          # PortfolioEvent, EventPayload
│       ├── adapters/
│       │   ├── base.ts       # interface MessageBroker
│       │   ├── kafka.ts      # KafkaAdapter (kafkajs)
│       │   ├── redis.ts      # RedisAdapter (ioredis)
│       │   └── rabbitmq.ts   # RabbitAdapter (amqplib)
│       └── publishers/
│           ├── contact.ts    # publica ContactEvent
│           └── analytics.ts  # publica PageViewEvent
├── app/
│   └── api/
│       ├── contact/
│       │   └── route.ts      # usa messaging/publishers/contact
│       └── events/
│           └── route.ts      # SSE endpoint para el browser
```

---

## Tipos de Eventos

```typescript
// src/lib/messaging/types.ts

export type EventType =
  | 'contact.form.submitted'
  | 'page.viewed'
  | 'cv.downloaded'
  | 'project.clicked'
  | 'github.activity.new';

export interface PortfolioEvent<T = unknown> {
  id: string;           // uuid
  type: EventType;
  timestamp: string;    // ISO 8601
  sessionId?: string;
  payload: T;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  source: 'portfolio';
}

export interface PageViewPayload {
  path: string;
  referrer?: string;
  userAgent?: string;
}
```

---

## Variables de Entorno Necesarias

```env
# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Upstash Kafka
UPSTASH_KAFKA_REST_URL=
UPSTASH_KAFKA_REST_USERNAME=
UPSTASH_KAFKA_REST_PASSWORD=

# CloudAMQP (RabbitMQ)
CLOUDAMQP_URL=

# Broker activo (redis | kafka | rabbitmq | nats)
MESSAGING_BROKER=redis
```

---

## Proyecto de referencia — BrokerNuma

Implementación del adapter pattern planificado arriba:

```
Proyectos/
└── BrokerNuma/            ← microservicio NestJS standalone
    ├── src/
    │   ├── events/        ← DTO (class-validator) + transformer + controller
    │   └── messaging/     ← IBroker interface + KafkaAdapter / RedisAdapter / RabbitMQAdapter
    ├── docker-compose.yml ← Kafka + Redis + RabbitMQ locales
    └── .env.example       ← MESSAGING_BROKER=kafka|redis|rabbitmq
```

**Pipeline:** `POST /api/v1/events` → validación → transformación → broker seleccionado por env var.

---

## Referencias

- [Upstash Kafka Docs](https://upstash.com/docs/kafka)
- [Upstash Redis Docs](https://upstash.com/docs/redis)
- [kafkajs](https://kafka.js.org)
- [ioredis](https://github.com/redis/ioredis)
- [CloudAMQP](https://www.cloudamqp.com/docs/index.html)
- [NATS.io](https://docs.nats.io)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
