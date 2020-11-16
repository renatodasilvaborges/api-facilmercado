# Recuepração de Senha

** Requisitos Funcionais **

- O usuário deve poder recuperar a sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com intruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

** Requisitos Não Funcionais **

- Utilizar mailtrap para testar envios de e-mail na ferramenta;
- Utilizar Amazon SES para envio em produção;
- O envio de e-mails deve acontencer em segundo plano (background job);

** Requisitos de Negócio **

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Alteração do Perfil

** Requisitos Funcionais **

- O usuário deve atualizar o seu perfil (nome, email, senha);

** Requisitos Negócio **

- O usuário não pode alterar o seu e-mail para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

** Requisitos Funcionais **

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um agendamento;
- O prestador deve poder visualizar as notificações não lidas


** Requisitos não funcionais **

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em tempo-real para utilizado em Socket.io;

** Regra de Negócio **

- A notificação deve ter um status de lida ou não lida para que prestador possa controlar

# Agendamento de Serviço

** Requisitos Funcionais **

- O usuáriopode listar todos os prestadores de serviços cadastraos;
- O usuário deve listar todos os dias de um mês com pelo menos com um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

** Requisitos Não Funcionais **

- A listagem de prestadore deve ser amazenada em cache;

** Requisitos Negócio **

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponíveis entre 8h às 18h (primeiro às 8h, último às 17h).
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um serviço consigo mesmo;




# Orientações Gerais

> Começar Mapeando O Service da Aplicação Que será criado para um requisito funcional;
> Iniciar a construção do teste da aplicação
> Modelagem dos dados da tabela nas entidades do módulo
> Criação da interface da entidade nos repositórios


------


> Criar Rotas e Controllers
> Criar repositório de tokens (TypeORM)
> Criar migrations de tokens
> Provider de Envio de E-mail (DEV)
> Registrar Provider no container
> Testar tudo !



-----


> Novas Rotas Cria no index do routes lá no shared
