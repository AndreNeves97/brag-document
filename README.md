# Professional Career Notebook

**Brag Document potencializado com IA** — um repositório pessoal que transforma registros de carreira em uma base de conhecimento estruturada, pronta para ser consumida por agentes de IA.

> O conceito de Brag Document foi popularizado por [Julia Evans (2019)](https://jvns.ca/blog/brag-documents/) como um documento vivo para registrar conquistas, contribuições e impacto profissional. Este repositório leva essa ideia além: ao estruturar o conteúdo em Markdown dentro de um repo Git, ele se torna **contexto rico para agentes de IA** (como o [Cursor](https://cursor.com)), habilitando automações que economizam horas de trabalho.

---

## 📢 Tech Leads Club Share Day (21/02/2026)

Este repositório foi apresentado no **Tech Leads Club Share Day**.

👉 **[Acesse aqui os materiais da palestra (roteiro, slides e diagramas)](knowledge-base/tech-leads-club/share-day-presentation/)**

---

## O que este repositório faz

Em vez de manter um documento estático, este repositório organiza toda a minha trajetória profissional — experiências, skills, storytellings, conteúdos técnicos e processos seletivos — de forma que um agente de IA consiga cruzar informações e gerar outputs de alta qualidade.

**Casos de uso reais:**

- **Currículo hiper-customizado por vaga** — a IA cruza o job description com minhas experiências e gera um currículo enfatizando os matches relevantes
- **Preparação para entrevistas** — sugestões de perguntas comportamentais com respostas baseadas em experiências reais, e conceitos técnicos para revisar com referência a conteúdos já estudados
- **Auto-avaliação de performance** — preencher formulários de avaliação com evidências concretas e métricas, em minutos
- **Gestão de aprendizados** — registros de cursos, eventos e estudos que retroalimentam todos os outros casos de uso

---

## Estrutura do repositório

```
professional-career-notebook/
│
├── source-of-truth/              # Fonte primária de informação
│   ├── personal-professional-profile.md
│   ├── work-experience.md
│   ├── relevant-experiences.md
│   ├── storytellings.md
│   ├── personal-projects.md
│   └── academic-projects-experiences.md
│
├── knowledge-base/               # Conteúdos técnicos e de estudo
│   ├── algorithms/               # Exercícios e anotações de algoritmos
│   ├── architecture/             # Arquitetura de software
│   ├── artificial-intelligence/  # IA e workflows com IA
│   ├── courses/                  # Anotações de cursos e workshops
│   ├── english-training/         # Prática de inglês
│   ├── software-engineering/     # Engenharia de software em geral
│   ├── system-design-interview/  # Preparação para system design
│   └── tech-leads-club/          # Conteúdos da comunidade Tech Leads Club
│
├── hiring-processes/             # Processos seletivos
│   ├── in-progress/              # Em andamento
│   └── completed/                # Finalizados (histórico)
│
├── evaluations/                  # Avaliações de performance
├── interview-preparation/        # Preparação para entrevistas (templates e roteiros)
├── guidelines/                   # Dicas de currículo, copywriting, busca de vagas e recrutadores
├── salary-compensations/         # Referências de compensação
├── linkedin-posts/               # Rascunhos e posts publicados
├── resumes/                      # Currículos em PDF e materiais de apresentação
├── resume-generator/             # Ferramenta para gerar currículo em PDF a partir de YAML
│
├── .cursor/
│   ├── rules/                    # Regras always-apply para o comportamento da IA
│   └── skills/                   # Skills condicionais (automações específicas)
│
└── README.md
```

### Pastas-chave

| Pasta | Propósito |
|---|---|
| `source-of-truth/` | **Dados canônicos** sobre perfil, experiências e storytellings. É a fonte que a IA prioriza para gerar qualquer output. |
| `knowledge-base/` | **Base de conhecimento técnico.** Tudo que estudo (cursos, system design, algoritmos) fica registrado aqui e é reutilizado automaticamente nas preparações de entrevista e currículo. |
| `hiring-processes/` | **Registro completo de cada processo seletivo** — job description, análise de fit, currículo gerado, preparação para entrevistas e resultado. |
| `.cursor/rules/` | **Regras globais** que definem tom, formato e comportamento da IA em toda interação. |
| `.cursor/skills/` | **Automações condicionais** — workflows que a IA executa para tarefas específicas (registrar processo seletivo, gerar currículo, etc.). |

---

## Como funciona

O fluxo geral segue este ciclo:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Registro de experiências         Registro de estudos      │
│   (source-of-truth/)               (knowledge-base/)        │
│         │                                │                  │
│         └──────────┐    ┌────────────────┘                  │
│                    ▼    ▼                                   │
│              ┌──────────────┐                               │
│              │  Cursor + IA │                               │
│              └──────┬───────┘                               │
│                     │                                       │
│         ┌───────────┼───────────┐                           │
│         ▼           ▼           ▼                           │
│    Currículo   Preparação   Avaliação                       │
│   customizado  entrevista   performance                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **Alimento o repositório** com experiências profissionais, storytellings, projetos e conteúdos de estudo
2. **A IA utiliza o contexto** das rules e skills para entender como processar cada tipo de tarefa
3. **Gero outputs** — currículos, preparações de entrevista, respostas de avaliação — todos baseados em dados reais e verificáveis

---

## Como usar como template

Se você quer criar seu próprio Brag Document com IA, a estrutura mínima para começar é:

```
meu-brag-document/
├── source-of-truth/
│   ├── profile.md                # Seu perfil profissional (resumo, skills, idiomas)
│   ├── work-experience.md        # Experiências de trabalho com métricas e impacto
│   └── storytellings.md          # Histórias formatadas em STAR (Situation, Task, Action, Result)
├── knowledge-base/               # Opcional: anotações de estudo e conteúdos técnicos
├── hiring-processes/             # Opcional: registro de processos seletivos
└── AGENTS.md                    # Instruções de comportamento para agentes de IA
```

**Dicas para começar:**

- Comece pelo `source-of-truth/` — liste suas experiências com **métricas e impacto concreto**
- Use o método **STAR** (Situation, Task, Action, Result) para storytellings
- Atualize quinzenalmente — cada update leva menos de 1 minuto
- Registre o trabalho "invisível": mentoria, code review, refactoring, melhorias de processo
- Compartilhe com seu gestor — facilita avaliações e conversas de carreira

---

## Referências

- [Get your work recognized: write a brag document — Julia Evans (2019)](https://jvns.ca/blog/brag-documents/)
- [Dica de carreira: crie um brag document — Elton Minetto (2022)](https://eltonminetto.dev/post/2022-04-14-brag-document/)
- [Boost your career with a brag sheet — Erica Pisani (2023)](https://ericapisani.dev/boost-your-career-with-a-brag-sheet/)
- [Get promoted faster with an AI-written brag doc — The AI-Augmented Engineer (2025)](https://www.augmentedswe.com/p/how-to-write-a-brag-doc-using-ai)
