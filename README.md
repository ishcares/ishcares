<div align="center">

# ISHITA CHAURASIA

### Backend Systems · Security · Fintech

> *I build systems where software meets security, scale, and human behavior.*

<br/>

`BUILD` &nbsp;→&nbsp; `BREAK` &nbsp;→&nbsp; `MEASURE` &nbsp;→&nbsp; `UNDERSTAND` &nbsp;→&nbsp; `IMPROVE`

<br/>

[`BIOLOCK`](#biolock) &nbsp;·&nbsp; [`HIRINGRADAR`](#hiringradar) &nbsp;·&nbsp; [`LEETCODE`](https://leetcode.com/u/ishita1106/) &nbsp;·&nbsp; [`LINKEDIN`](https://linkedin.com/in/ishitachaurasia) &nbsp;·&nbsp; [`EMAIL`](mailto:ishita20004@gmail.com)

</div>

<br/>

---

### 01 / FEATURED SYSTEMS

<table>
<tr>
<td width="50%" valign="top">

<sub><code>SECURITY / JAVA / FINTECH</code></sub>

## BioLock
**Transaction Authorization Backend**

> *Bind the authorization to the transaction — not just the user.*

Traditional authentication proves identity, but fails if transaction details are altered in flight before settlement.

BioLock binds each authorization to a deterministic canonical payload (`txId | amount | payee | nonce | timestamp`) verified via JCA over the NIST P-256 curve. Changing any signed field produces a different payload, causing signature verification to fail.

<br/>

`STACK` &nbsp; Java 17 · Spring Boot 3.2.2 · JCA · ECDSA (secp256r1) · JUnit 5  
`STATUS` &nbsp; Reference backend (in-memory state) · Redis architecture roadmap  
`ACCESS` &nbsp; [Repository ↗](https://github.com/ishcares/Biolock) · [Live Demo API ↗](https://biolock-28kv.onrender.com/api/demo/run)

</td>
<td width="50%" valign="top">

<sub><code>AUTOMATION / BACKEND / SEARCH</code></sub>

## HiringRadar
**Automated Job Discovery & Semantic Matching**

> *Turn unstructured careers pages into actionable, high-signal alerts.*

Careers pages across tech companies update asynchronously at all hours, making manual tracking ineffective.

HiringRadar is an asynchronous pipeline that ingests live job feeds across 35+ company boards, extracts technical requirements, executes a multi-stage semantic matching pipeline (vector retrieval + cross-encoder reranking + skill ontology checks), and delivers real-time notifications over Telegram.

<br/>

`STACK` &nbsp; Python · FastAPI · PostgreSQL · Cloudflare Workers AI · Telegram API  
`STATUS` &nbsp; Production deployment serving registered student subscribers  
`ACCESS` &nbsp; [Repository ↗](https://github.com/ishcares/HiringRadar) · [Telegram Bot ↗](https://t.me/Hiringradar_bot)

</td>
</tr>
</table>

<br/>

---

### 02 / ENGINEERING MINDSET

```
  ┌─────────────────────────────────────────────────────────────┐
  │   BUILD  ↓  BREAK  ↓  MEASURE  ↓  UNDERSTAND  ↓  IMPROVE     │
  └─────────────────────────────────────────────────────────────┘
```

> I care about understanding not only whether something works, but **why** it works, **where** it breaks under unexpected conditions, and what changes when an isolated concept becomes a real system under load.

<br/>

---

### 03 / FOCUS & TOOLING

| Domain | Core Focus & Technologies |
| :--- | :--- |
| **Backend & APIs** | Java 17 · Spring Boot · REST API Design · FastAPI · Asynchronous Pipelines |
| **Systems & Architecture** | Concurrency · Multithreading · Relational Schema Design · Caching Strategies |
| **Security Engineering** | Cryptographic Protocols · JCA · ECDSA · API Security · Threat Modeling · Fail-Closed Design |
| **Data & Storage** | PostgreSQL · MySQL · Redis |
| **Infrastructure & Tooling** | Linux · Docker · AWS · Git · Maven · Gradle |

<br/>

---

### 04 / THINGS I KEEP THINKING ABOUT

> * Can a system authenticate the person, but still fail to authenticate their action?
> * What guarantees come strictly from cryptography, and which are merely operational assumptions?
> * Where does security end and system architecture begin?
> * What happens when the happy path disappears under edge concurrency?

<br/>

---

### 05 / REPOSITORY INDEX

```text
01  BioLock      Transaction authorization backend (Java 17 / JCA / ECDSA)  →  github.com/ishcares/Biolock
02  HiringRadar  Automated job discovery & semantic matching pipeline       →  github.com/ishcares/HiringRadar
```

<br/>

---

### 06 / FOUNDATIONS

```
Data Structures & Algorithms · Object-Oriented Design · Operating Systems · DBMS · Computer Networks
```

<br/>

---

<div align="center">

`Building, breaking, learning — and occasionally wondering why the bug only appears after midnight.`

<br/>

[LinkedIn](https://linkedin.com/in/ishitachaurasia) &nbsp;·&nbsp; [LeetCode](https://leetcode.com/u/ishita1106/) &nbsp;·&nbsp; [GitHub](https://github.com/ishcares) &nbsp;·&nbsp; [Email](mailto:ishita20004@gmail.com)

</div>
