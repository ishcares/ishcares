<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=3&section=header" width="100%" />

<br/>

# ISHITA CHAURASIA

### Backend Systems · Security · Fintech

> *I build systems where software meets security, scale, and human behavior.*

<br/>

[![Focus: Backend Systems](https://img.shields.io/badge/FOCUS-Backend%20Systems-0ea5e9?style=flat-square&labelColor=0f172a)](https://github.com/ishcares)
[![Domain: Security & Fintech](https://img.shields.io/badge/DOMAIN-Security%20%26%20Fintech-6366f1?style=flat-square&labelColor=0f172a)](https://github.com/ishcares)
[![Status: Building](https://img.shields.io/badge/STATUS-Active%20Systems-10b981?style=flat-square&labelColor=0f172a)](https://github.com/ishcares)

<br/>

`BUILD` &nbsp;→&nbsp; `BREAK` &nbsp;→&nbsp; `MEASURE` &nbsp;→&nbsp; `UNDERSTAND` &nbsp;→&nbsp; `IMPROVE`

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white&labelColor=0f172a)](https://linkedin.com/in/ishitachaurasia)
[![LeetCode](https://img.shields.io/badge/LeetCode-Profile-FFA116?style=flat-square&logo=leetcode&logoColor=white&labelColor=0f172a)](https://leetcode.com/u/ishita1106/)
[![GitHub](https://img.shields.io/badge/GitHub-ishcares-181717?style=flat-square&logo=github&logoColor=white&labelColor=0f172a)](https://github.com/ishcares)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail&logoColor=white&labelColor=0f172a)](mailto:ishita20004@gmail.com)

</div>

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

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

[![Java 17](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white&labelColor=0f172a)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-6DB33F?style=flat-square&logo=springboot&logoColor=white&labelColor=0f172a)](https://spring.io/projects/spring-boot)
[![JCA](https://img.shields.io/badge/JCA-ECDSA%20%2F%20P--256-0ea5e9?style=flat-square&labelColor=0f172a)](https://github.com/ishcares/Biolock)
[![Live Demo](https://img.shields.io/badge/Live%20API-Verified-10b981?style=flat-square&logo=render&logoColor=white&labelColor=0f172a)](https://biolock-28kv.onrender.com/api/demo/run)

<br/>

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

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white&labelColor=0f172a)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688?style=flat-square&logo=fastapi&logoColor=white&labelColor=0f172a)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%20Serverless-4169E1?style=flat-square&logo=postgresql&logoColor=white&labelColor=0f172a)](https://neon.tech)
[![Telegram](https://img.shields.io/badge/Telegram%20Bot-Active-26A5E4?style=flat-square&logo=telegram&logoColor=white&labelColor=0f172a)](https://t.me/Hiringradar_bot)

<br/>

`STATUS` &nbsp; Production deployment serving registered student subscribers  
`ACCESS` &nbsp; [Repository ↗](https://github.com/ishcares/HiringRadar) · [Telegram Bot ↗](https://t.me/Hiringradar_bot)

</td>
</tr>
</table>

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

### 02 / ENGINEERING MINDSET

```
  ┌─────────────────────────────────────────────────────────────┐
  │   BUILD  ↓  BREAK  ↓  MEASURE  ↓  UNDERSTAND  ↓  IMPROVE     │
  └─────────────────────────────────────────────────────────────┘
```

> I care about understanding not only whether something works, but **why** it works, **where** it breaks under unexpected conditions, and what changes when an isolated concept becomes a real system under load.

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

### 03 / FOCUS & TOOLING

| Domain | Core Focus & Technologies |
| :--- | :--- |
| **Backend & APIs** | Java 17 · Spring Boot · REST API Design · FastAPI · Asynchronous Pipelines |
| **Systems & Architecture** | Concurrency · Multithreading · Relational Schema Design · Caching Strategies |
| **Security Engineering** | Cryptographic Protocols · JCA · ECDSA · API Security · Threat Modeling · Fail-Closed Design |
| **Data & Storage** | PostgreSQL · MySQL · Redis |
| **Infrastructure & Tooling** | Linux · Docker · AWS · Git · Maven · Gradle |

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

### 04 / THINGS I KEEP THINKING ABOUT

> * Can a system authenticate the person, but still fail to authenticate their action?
> * What guarantees come strictly from cryptography, and which are merely operational assumptions?
> * Where does security end and system architecture begin?
> * What happens when the happy path disappears under edge concurrency?

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

### 05 / REPOSITORY INDEX

```text
01  BioLock      Transaction authorization backend (Java 17 / JCA / ECDSA)  →  github.com/ishcares/Biolock
02  HiringRadar  Automated job discovery & semantic matching pipeline       →  github.com/ishcares/HiringRadar
```

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

### 06 / FOUNDATIONS

```
Data Structures & Algorithms · Object-Oriented Design · Operating Systems · DBMS · Computer Networks
```

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=1&section=header" width="100%" />

<div align="center">

`Building, breaking, learning — and occasionally wondering why the bug only appears after midnight.`

<br/>

[LinkedIn](https://linkedin.com/in/ishitachaurasia) &nbsp;·&nbsp; [LeetCode](https://leetcode.com/u/ishita1106/) &nbsp;·&nbsp; [GitHub](https://github.com/ishcares) &nbsp;·&nbsp; [Email](mailto:ishita20004@gmail.com)

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:6366f1,100:0ea5e9&height=2&section=header" width="100%" />

</div>
