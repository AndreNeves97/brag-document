# Redis Pub/Sub vs. Redis Streams (vs. Lists)

Em System Design, escolher o mecanismo correto de mensageria no Redis é crucial para definir a **durabilidade**, **consistência** e **escalabilidade** do seu sistema.

Este guia detalha as diferenças entre **Pub/Sub**, **Streams** e **Lists**, focando em quando usar cada um.

---

## 1. Redis Pub/Sub (Fire-and-Forget)

O padrão **Publish/Subscribe** é um mecanismo de transmissão de mensagens onde os emissores (publishers) não enviam mensagens para destinatários específicos. Em vez disso, as mensagens são publicadas em canais (channels).

### Características Principais
*   **Fire-and-Forget:** O Redis não armazena a mensagem. Se não houver ninguém ouvindo no canal no momento do envio, a mensagem é **perdida para sempre**.
*   **Fan-out:** Uma mensagem enviada para um canal é entregue imediatamente a **todos** os assinantes daquele canal.
*   **Baixa Latência:** Extremamente rápido, pois não há overhead de persistência ou ack.
*   **Sem Histórico:** Um novo assinante não recebe mensagens passadas.

### Use Cases Ideais
*   **Notificações em Tempo Real:** "O usuário X está digitando...", "Novo like na sua foto".
*   **Chat Efêmero:** Onde o histórico não é crítico ou é carregado de outra fonte.
*   **Service Discovery:** Avisar serviços que uma nova instância subiu.
*   **Live Updates (Ex: Collaborative Editor):** Mostrar a posição do cursor do mouse de outros usuários em tempo real. Se perder um pacote de "posição do mouse", não é crítico, pois o próximo pacote corrigirá a posição.

---

## 2. Redis Streams (Log de Eventos Persistente)

Introduzido no Redis 5.0, o **Streams** é uma estrutura de dados de log (append-only log), inspirada no Apache Kafka. Ele resolve o problema da falta de persistência do Pub/Sub.

### Características Principais
*   **Persistência:** As mensagens são armazenadas no disco (se o Redis estiver configurado para tal) e na memória. Elas ficam lá até serem explicitamente deletadas ou expiradas (capping).
*   **Consumer Groups:** Permite que múltiplos consumidores leiam do mesmo stream de forma coordenada. O Redis gerencia qual consumidor leu qual mensagem (offset).
*   **Acknowledge (ACK):** O consumidor precisa confirmar (`XACK`) que processou a mensagem. Se o consumidor falhar antes do ACK, a mensagem pode ser reprocessada por outro (garantia de entrega "at-least-once").
*   **Acesso ao Histórico:** Novos consumidores podem ler mensagens antigas desde o início do stream (`0`) ou apenas novas (`$`).

### Use Cases Ideais
*   **Event Sourcing:** Armazenar todas as mudanças de estado de um objeto (ex: todas as edições em um documento).
*   **Job Queues Confiáveis:** Onde a perda de uma tarefa é inaceitável (ex: processamento de pagamento, envio de email transacional).
*   **Snapshot Workers:** Consolidar deltas de edição em um banco de dados SQL/NoSQL. O worker pode cair e voltar, continuando de onde parou sem perder dados.

---

## 3. Redis Lists (Filas Simples)

Antes do Streams, usava-se Lists (`LPUSH` / `RPOP`) para filas. Ainda é válido para casos simples.

### Características
*   **Simples:** Fácil de entender e implementar.
*   **Um Consumidor por Mensagem:** Ao fazer `POP`, a mensagem sai da fila. Não é ideal para Fan-out (múltiplos serviços precisando do mesmo dado).
*   **Sem Consumer Groups Nativos:** Requer implementação manual para lidar com falhas e retentativas (ex: `RPOPLPUSH` para mover para uma fila de processamento/dead-letter).

---

## Resumo Comparativo: O Cenário do "Editor Colaborativo"

Imagine que você está desenhando um Google Docs. Você precisa de duas coisas:
1.  Que os usuários vejam as letras aparecendo na tela uns dos outros **agora**.
2.  Que o documento seja salvo no banco de dados com segurança.

### O Erro Comum (Usar Pub/Sub para tudo)
Se você usar Pub/Sub para o Worker salvar no banco:
*   O usuário digita "A". O servidor publica no canal `doc-123`.
*   O Worker está reiniciando (deploy) e perde a mensagem.
*   O usuário vê "A", mas no banco de dados o "A" nunca foi salvo.
*   **Resultado:** Perda de dados.

### A Arquitetura Correta (Hybrid Approach)

| Componente | Tecnologia | Por que? |
| :--- | :--- | :--- |
| **User-to-User Sync** | **Redis Pub/Sub** | Precisamos de velocidade máxima (Real-time). Se um usuário perder um pacote de "cursor position", não quebra o documento. |
| **Persistência (Worker)** | **Redis Streams** | Precisamos de confiabilidade. O Worker lê a Stream como um "Write-Ahead Log". Se o Worker cair, o Redis guarda o offset e o Worker retoma depois. Zero perda de dados. |

### Tabela de Decisão Rápida

| Feature | Pub/Sub | Streams | Lists |
| :--- | :---: | :---: | :---: |
| **Persistência** | ❌ Não | ✅ Sim | ✅ Sim |
| **Histórico** | ❌ Não | ✅ Sim | ✅ Sim |
| **Fan-out (1:N)** | ✅ Sim (Nativo) | ✅ Sim (Consumer Groups) | ⚠️ Difícil (Requer N listas) |
| **Garantia de Entrega** | At-most-once (Pode perder) | At-least-once (ACK) | At-most-once (No padrão) |
| **Complexidade** | Baixa | Média/Alta | Baixa |

