# BlueDrop Pets - Frontend Architecture

## Visão Geral

O projeto BlueDrop Pets Frontend está estruturado seguindo os padrões **MVC (Model-View-Controller)** e **DDD (Domain-Driven Design)**, com Angular 21 standalone components.

---

## Estrutura de Pastas

```
src/app/
├── core/                          # Camada Core - Serviços de aplicação
│   └── services/                  # Use Case / MVC Controllers
│       ├── dashboard-use-case.service.ts
│       ├── pet-use-case.service.ts
│       └── index.ts
│
├── shared/                        # Recursos compartilhados
│   ├── components/                # Componentes reutilizáveis
│   └── pipes/                     # Pipes compartilhados
│
├── data/                          # Camada de Dados (DTOs)
│   └── models/                    # Modelos de transferência de dados
│       ├── pet.dto.ts
│       ├── tutor.dto.ts
│       ├── appointment.dto.ts
│       └── index.ts
│
├── domain/                        # Camada de Domínio (Lógica de Negócio)
│   ├── entities/                  # Entidades com lógica de domínio
│   │   ├── pet.entity.ts
│   │   ├── tutor.entity.ts
│   │   ├── appointment.entity.ts
│   │   └── index.ts
│   └── services/                  # Serviços de domínio (orquestração)
│       ├── dashboard-domain.service.ts
│       ├── pet-domain.service.ts
│       └── index.ts
│
├── infrastructure/                # Camada de Infraestrutura (APIs, HTTP)
│   ├── config/
│   │   └── api.config.ts
│   └── services/                  # Serviços de API
│       ├── pet-api.service.ts
│       ├── dashboard-api.service.ts
│       └── index.ts
│
├── modules/                       # Módulos de Funcionalidades
│   ├── dashboard/
│   │   └── presentation/
│   │       └── dashboard.component.ts
│   └── layout/
│       └── presentation/
│           ├── header.component.ts
│           └── sidebar.component.ts
│
├── app.component.ts               # Componente raiz (shell)
├── app.routes.ts                  # Configuração de rotas
└── main.ts                        # Bootstrap da aplicação
```

---

## Padrões Arquiteturais

### 1. **Domain-Driven Design (DDD)**

#### `/domain/entities/`
Classes que representam conceitos do domínio, com lógica de negócio encapsulada:

```typescript
// Exemplo: Pet Entity
export class Pet {
  // Propriedades
  id: string;
  name: string;
  breed: string;
  // ...

  // Métodos de domínio (lógica de negócio)
  getAgeCategory(): 'filhote' | 'adulto' | 'sênior'
  needsVaccination(): boolean
  getDisplayName(): string
  isValid(): boolean
  deactivate(): void
  activate(): void
}
```

**Responsabilidades:**
- Representar conceitos reais do domínio
- Encapsular regras de negócio
- Garantir consistência dos dados
- Validação de domínio

#### `/domain/services/`
Serviços que orquestram lógica entre múltiplas entidades:

```typescript
// Exemplo: PetDomainService
@Injectable({ providedIn: 'root' })
export class PetDomainService {
  filterPetsByTutor(pets: Pet[], tutorId: string): Pet[]
  filterActivePets(pets: Pet[]): Pet[]
  groupPetsByTutor(pets: Pet[]): Record<string, Pet[]>
  getAgeDistribution(pets: Pet[]): Record<string, number>
  getPetsNeedingVaccination(pets: Pet[]): Pet[]
}
```

---

### 2. **Model-View-Controller (MVC)**

#### **Model** = `/data/models/` + `/domain/entities/`

**DTOs (Data Transfer Objects)** - Formato de dados da API:
```typescript
// /data/models/pet.dto.ts
export interface PetDTO {
  id: string;
  name: string;
  breed: string;
  // ...
}
```

**Entities** - Objetos de domínio com lógica:
```typescript
// /domain/entities/pet.entity.ts
export class Pet { /* com métodos de negócio */ }
```

#### **View** = `/modules/*/presentation/*.component.ts`

Componentes baseados em templates que exibem dados:

```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `...`,
  styles: [`...`]
})
export class DashboardComponent { }
```

**Características:**
- Standalone components
- Templates com control flow (@if, @for)
- Signal-based reactivity
- Sem lógica de negócio

#### **Controller** = `/core/services/` (Use Case Services)

Serviços que orquestram Domain Services + Infrastructure Services:

```typescript
// /core/services/pet-use-case.service.ts
@Injectable({ providedIn: 'root' })
export class PetUseCaseService {
  // Usa Domain Service + API Service
  
  loadPets(): Observable<Pet[]> {
    return this.apiService.getAllPets().pipe(
      tap(pets => {
        const sorted = this.domainService.sortByName(pets);
        this.state.update(s => ({ ...s, pets: sorted }));
      })
    );
  }
}
```

---

### 3. **Fluxo de Dados**

```
┌─────────────────┐
│    Component    │ (View)
│  (Presentation) │
└────────┬────────┘
         │ inject()
         ↓
┌─────────────────────────┐
│  Use Case Service       │ (Controller/MVC)
│ (PetUseCaseService)     │
└────────┬────────────────┘
         │
    ┌────┴─────┐
    ↓          ↓
┌──────────┐ ┌──────────────┐
│ Domain   │ │ Infrastructure
│ Service  │ │ Service (API)
└──────┬───┘ └──────┬────────┘
       │            │
       ↓            ↓
   ┌────────────────────┐
   │  Entity / Lógica   │
   │  de Negócio        │
   └────────────────────┘
```

---

## Tecnologias & Padrões

### **Angular 21 Features**
- ✅ **Standalone Components** - Sem módulos
- ✅ **Signals** - Reatividade moderna
- ✅ **Control Flow** - @if, @for
- ✅ **Dependency Injection** - inject()
- ✅ **New HTTP Client** - provideHttpClient()

### **RxJS Patterns**
- `Observable` - Streams de dados assíncronos
- `BehaviorSubject` - Estado mutável
- `signal` - Estado imutável reativo
- `tap`, `map`, `catchError` - Operadores

### **TypeScript Patterns**
- `readonly` - Imutabilidade
- `computed()` - Valores derivados
- `interface` + `class` - Type safety
- Encapsulamento de negócio

---

## Fluxo de Desenvolvimento

### Para criar uma **nova funcionalidade**:

1. **Criar Entity** em `/domain/entities/`
   ```typescript
   export class Appointment { /* regras de negócio */ }
   ```

2. **Criar DTO** em `/data/models/`
   ```typescript
   export interface AppointmentDTO { /* estrutura API */ }
   ```

3. **Criar Domain Service** em `/domain/services/`
   ```typescript
   export class AppointmentDomainService { /* lógica */ }
   ```

4. **Criar API Service** em `/infrastructure/services/`
   ```typescript
   export class AppointmentApiService { /* HTTP calls */ }
   ```

5. **Criar Use Case Service** em `/core/services/`
   ```typescript
   export class AppointmentUseCaseService { /* orquestração */ }
   ```

6. **Criar Component** em `/modules/*/presentation/`
   ```typescript
   @Component({ /* apresentação */ })
   export class AppointmentComponent { }
   ```

---

## Signal-based State Management

Usando Angular Signals para estado reativo:

```typescript
// Declarar estado
private state = signal<PetState>({
  pets: [],
  loading: false,
  error: null
});

// Criar sinais computados
readonly pets = computed(() => this.state().pets);
readonly loading = computed(() => this.state().loading);

// Atualizar estado
this.state.update(s => ({ ...s, pets: newPets }));

// Usar no template
@for (pet of pets(); track pet.id) {
  <div>{{ pet.name }}</div>
}
```

---

## Stack Técnico

| Camada | Tecnologia | Propósito |
|--------|-----------|----------|
| **Presentation** | Angular 21 + Standalone | UI Components |
| **Controller** | Services (Use Case) | Orquestração |
| **Domain** | Classes com métodos | Regras de Negócio |
| **Infrastructure** | HttpClient + APIs | Data Access |
| **State** | Signals + computed | Reatividade |
| **Styling** | CSS-in-JS (inline) | Componentes estilizados |

---

## Benefícios da Arquitetura

✅ **Separação de Responsabilidades** - Cada camada tem seu propósito  
✅ **Testabilidade** - Lógica de negócio independente da UI  
✅ **Manutenibilidade** - Fácil localizar e modificar código  
✅ **Escalabilidade** - Adicionar novas features sem afetar existentes  
✅ **Type Safety** - TypeScript em todas as camadas  
✅ **Performance** - Signals e tree-shaking otimizado  
✅ **DX Moderno** - Standalone components e sintaxe limpa  

---

## Próximos Passos

- [ ] Integrar biblioteca de ícones (Ng-Icons + Heroicons)
- [ ] Implementar páginas de features (Pets, Tutores, Agendamentos)
- [ ] Configurar interceptores HTTP para autenticação
- [ ] Adicionar pipes customizados
- [ ] Implementar error handling global
- [ ] Setup de testes unitários (Jasmine)
- [ ] Configurar ambiente de produção
