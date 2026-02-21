# Tech interview - Frontend

## General questions

1. **What is a single-page application?**
    1. **What are their benefits?**
        - **SPA**: Application that loads a single HTML page and dynamically updates content without full page reloads
        - **Benefits**:
            - Faster navigation (no full page reloads)
            - Better user experience
            - Reduced server load
            - Offline capabilities (with service workers)
            - Smoother transitions
        - **Challenges**:
            - SEO complexity
            - Initial load time
            - Memory management
            - Browser history management

2. **Angular contracts, angular functions, if you are building an application what components or contrast do you use?**
    - **Contracts**: Interfaces that define the structure of data
    - **Functions**: Methods that perform specific operations
    - **Components**: Reusable UI elements with their own logic and template
    - **Services**: Shared business logic and data management
    - **Directives**: DOM manipulation and behavior extension
    - **Pipes**: Data transformation in templates

3. **What do I have to do to use a component in other places as a reference?**
    - **Export the component**: Make it available for import
    - **Import in the target module**: Add to imports array
    - **Declare in module**: Add to declarations array
    - **Use selector**: Reference in template with component selector
    - **Example**:
        ```typescript
        // component.ts
        @Component({
          selector: 'app-user-card',
          templateUrl: './user-card.component.html'
        })
        export class UserCardComponent { }
        
        // other-component.html
        <app-user-card></app-user-card>
        ```

4. **What is lazy loading of modules?**
    - **Definition**: Loading modules only when needed, reducing initial bundle size
    - **Benefits**:
        - Faster initial load time
        - Better performance
        - Reduced memory usage
    - **Implementation**:
        ```typescript
        const routes: Routes = [
          {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
          }
        ];
        ```

5. **Could you explain how to render a list with lazy loading in the most performant way?**
    - **Virtual Scrolling**: Only render visible items
    - **Infinite Scroll**: Load more items as user scrolls
    - **Pagination**: Load items in pages
    - **On-demand loading**: Load items when needed
    - **Example with Angular CDK**:
        ```typescript
        <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
          <div *cdkVirtualFor="let item of items">{{item}}</div>
        </cdk-virtual-scroll-viewport>
        ```

6. **How can I make a singleton service?**
    1. **That singleton service has methods that have to be called from each component. So it has to be an instance per scoped component, like.**
    - **Singleton Service**:
        ```typescript
        @Injectable({
          providedIn: 'root'  // Makes it singleton
        })
        export class DataService {
          private data: any[] = [];
          
          getData() { return this.data; }
          addData(item: any) { this.data.push(item); }
        }
        ```
    - **Scoped Service**:
        ```typescript
        @Injectable()
        export class ScopedService {
          // Provided at component level
        }
        
        @Component({
          providers: [ScopedService]  // New instance per component
        })
        ```

7. **What's the difference between a component and a directive?**
    - **Component**:
        - Has template (view)
        - Self-contained UI element
        - Can have multiple components
        - Example: `<app-user-card>`
    - **Directive**:
        - No template (behavior only)
        - Modifies existing elements
        - Three types: Component, Structural, Attribute
        - Example: `*ngIf`, `[ngClass]`

8. **What is data binding?**
    - **Interpolation**: `{{ expression }}`
    - **Property Binding**: `[property]="expression"`
    - **Event Binding**: `(event)="handler()"`
    - **Two-way Binding**: `[(ngModel)]="property"`
    - **Template Reference Variables**: `#variable`

9. **Component lifecycle**
    - **ngOnChanges**: Called when data-bound properties change
    - **ngOnInit**: Called after component initialization
    - **ngDoCheck**: Called during every change detection run
    - **ngAfterContentInit**: Called after content projection
    - **ngAfterViewInit**: Called after view initialization
    - **ngOnDestroy**: Called before component destruction

10. **Ng-if**
    - **Conditional rendering**: Shows/hides elements based on condition
    - **Creates/destroys DOM elements**: Not just hide/show
    - **Performance**: Better for rarely shown elements
    - **Example**: `<div *ngIf="isVisible">Content</div>`

11. **Ng-content, ng-container, and ng-template**
    - **ng-content**: Content projection slot
    - **ng-container**: Logical container (no DOM element)
    - **ng-template**: Template definition (not rendered by default)
    - **Examples**:
        ```html
        <!-- ng-content -->
        <ng-content></ng-content>
        
        <!-- ng-container -->
        <ng-container *ngIf="condition">
          <div>Content</div>
        </ng-container>
        
        <!-- ng-template -->
        <ng-template #templateRef>
          <div>Template content</div>
        </ng-template>
        ```

12. **What is content projection inside angular?**
    - **Definition**: Inserting content from parent component into child component
    - **Types**:
        - **Single-slot**: One `<ng-content>`
        - **Multi-slot**: Multiple named slots
        - **Conditional**: Projected content with conditions
    - **Example**:
        ```html
        <!-- Parent -->
        <app-card>
          <h1>Title</h1>
          <p>Content</p>
        </app-card>
        
        <!-- Child -->
        <div class="card">
          <ng-content></ng-content>
        </div>
        ```

13. **Difference between service and component**
    - **Service**:
        - No UI (business logic only)
        - Singleton by default
        - Injectable across components
        - Handles data, API calls, utilities
    - **Component**:
        - Has UI (template, styles)
        - Instance per usage
        - Self-contained
        - Handles presentation logic

14. **Usage of async in component**
    - **Async pipe**: Automatically subscribes/unsubscribes
    - **Benefits**: Prevents memory leaks, automatic change detection
    - **Example**:
        ```html
        <div *ngFor="let user of users$ | async">
          {{ user.name }}
        </div>
        ```

15. **How to inject data into a component**
    - **Constructor injection**:
        ```typescript
        constructor(private dataService: DataService) {}
        ```
    - **Input properties**:
        ```typescript
        @Input() data: any;
        ```
    - **Dependency injection**:
        ```typescript
        constructor(@Inject('API_URL') private apiUrl: string) {}
        ```

16. **How to pass data from one component to another**
    - **Parent to Child**: `@Input()` decorator
    - **Child to Parent**: `@Output()` with EventEmitter
    - **Service**: Shared service for communication
    - **Route parameters**: Pass data via URL
    - **State management**: NgRx, Redux, etc.

17. **What is an observable.**
    - **Definition**: Stream of data over time
    - **Characteristics**:
        - Lazy (doesn't execute until subscribed)
        - Can emit multiple values
        - Can be cancelled
        - Supports operators
    - **Example**:
        ```typescript
        const observable = new Observable(observer => {
          observer.next('value');
          observer.complete();
        });
        ```

18. **You know some RxJS pipe (map)**
    - **map**: Transform values
    - **filter**: Filter values based on condition
    - **tap**: Side effects without changing stream
    - **switchMap**: Switch to new observable
    - **mergeMap**: Merge multiple observables
    - **debounceTime**: Delay emissions
    - **distinctUntilChanged**: Only emit when value changes

19. **RxJS: Subjects and BehaviorSubject, what is each one, what differences do they have.**
    - **Subject**:
        - Multicast to multiple subscribers
        - No initial value
        - Subscribers only get values after subscription
    - **BehaviorSubject**:
        - Has initial value
        - New subscribers get current value immediately
        - Stores last emitted value
    - **ReplaySubject**: Replays specified number of values
    - **AsyncSubject**: Only emits last value when completed

20. **Observable: What difference do you have with a promise.**
    - **Observable**:
        - Can emit multiple values
        - Can be cancelled
        - Lazy execution
        - Rich operators
        - Can be retried
    - **Promise**:
        - Single value only
        - Cannot be cancelled
        - Eager execution
        - Limited operators
        - Cannot be retried

21. **How to fetch information before load the component? ngOnChanges**
    - **ngOnInit**: Best place for initial data loading
    - **Resolver**: Pre-fetch data before route activation
    - **Guard**: Check conditions before navigation
    - **Example**:
        ```typescript
        ngOnInit() {
          this.dataService.getData().subscribe(data => {
            this.data = data;
          });
        }
        ```

22. **Data resolvers**
    1. **Route resolve in Angular.js**
        - Pre-fetch data before component loads
        - Prevents component from loading until data is ready
    2. **https://angular.io/api/router/Resolve**
        ```typescript
        @Injectable()
        export class DataResolver implements Resolve<any> {
          resolve(route: ActivatedRouteSnapshot) {
            return this.dataService.getData();
          }
        }
        ```

23. **How to get data from data resolvers.**
    1. **Where that executes?**
        - **Resolver**: Executes before component loads
        - **Access in component**:
            ```typescript
            constructor(private route: ActivatedRoute) {
              this.route.data.subscribe(data => {
                this.resolvedData = data['key'];
              });
            }
            ```

24. **Content Projection**
    - **Single-slot**: Basic content projection
    - **Multi-slot**: Named slots with `select` attribute
    - **Conditional**: Project content based on conditions
    - **Example**:
        ```html
        <!-- Multi-slot -->
        <ng-content select="[slot=header]"></ng-content>
        <ng-content select="[slot=body]"></ng-content>
        ```

25. **Unit testing**
    - **Testing frameworks**: Jasmine, Jest
    - **Testing utilities**: TestBed, ComponentFixture
    - **Mocking**: SpyOn, createSpy
    - **Testing strategies**:
        - **Isolated**: Test component in isolation
        - **Shallow**: Test component with child components
        - **Integration**: Test component with real dependencies

## Additional Important Topics

### State Management
1. **NgRx**
    - **Store**: Central state container
    - **Actions**: Describe what happened
    - **Reducers**: Pure functions that handle state changes
    - **Effects**: Handle side effects
    - **Selectors**: Extract data from store

2. **Alternative state management**
    - **Akita**: Simpler than NgRx
    - **NGXS**: Similar to NgRx but simpler
    - **Service-based**: Simple state management with services

### Performance Optimization
1. **Change Detection**
    - **OnPush strategy**: Manual change detection
    - **TrackBy function**: Optimize *ngFor
    - **Pure pipes**: Memoized transformations
    - **Detach/reattach**: Manual control

2. **Bundle optimization**
    - **Tree shaking**: Remove unused code
    - **Lazy loading**: Load modules on demand
    - **Code splitting**: Split bundle into chunks
    - **AOT compilation**: Ahead-of-time compilation

### Advanced Angular Features
1. **Custom Pipes**
    ```typescript
    @Pipe({
      name: 'custom'
    })
    export class CustomPipe implements PipeTransform {
      transform(value: any, args?: any): any {
        return transformedValue;
      }
    }
    ```

2. **Custom Directives**
    ```typescript
    @Directive({
      selector: '[appCustom]'
    })
    export class CustomDirective {
      @Input() appCustom: string;
      
      constructor(private el: ElementRef) {}
    }
    ```

3. **Interceptors**
    - **HTTP interceptors**: Modify HTTP requests/responses
    - **Use cases**: Authentication, logging, error handling
    - **Example**:
        ```typescript
        @Injectable()
        export class AuthInterceptor implements HttpInterceptor {
          intercept(req: HttpRequest<any>, next: HttpHandler) {
            const authReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer token')
            });
            return next.handle(authReq);
          }
        }
        ```

### Testing Strategies
1. **Component testing**
    - **Isolated unit tests**: Test component logic
    - **Integration tests**: Test component with dependencies
    - **E2E tests**: Test complete user workflows

2. **Testing utilities**
    - **ComponentFixture**: Wrapper for component testing
    - **DebugElement**: DOM element wrapper
    - **By.css**: Element selection utilities

### Security
1. **XSS Prevention**
    - **Sanitization**: Angular automatically sanitizes content
    - **DomSanitizer**: Manual sanitization when needed
    - **Content Security Policy**: Restrict resource loading

2. **CSRF Protection**
    - **Token-based**: Include CSRF tokens in requests
    - **Same-origin policy**: Restrict cross-origin requests

### Accessibility (A11y)
1. **ARIA attributes**
    - **aria-label**: Provide accessible names
    - **aria-describedby**: Associate descriptions
    - **aria-hidden**: Hide from screen readers

2. **Keyboard navigation**
    - **Tab order**: Logical tab sequence
    - **Focus management**: Proper focus handling
    - **Keyboard shortcuts**: Custom keyboard interactions

### Internationalization (i18n)
1. **Angular i18n**
    - **Translation files**: Extract and manage translations
    - **Locale configuration**: Set up different locales
    - **Pluralization**: Handle plural forms

2. **Translation strategies**
    - **Build-time**: Compile translations into bundles
    - **Runtime**: Load translations dynamically

### Progressive Web Apps (PWA)
1. **Service Workers**
    - **Offline functionality**: Cache resources for offline use
    - **Background sync**: Sync data when online
    - **Push notifications**: Send notifications to users

2. **PWA features**
    - **Manifest**: App metadata and icons
    - **Install prompt**: Allow users to install app
    - **Offline support**: Work without internet

### Build and Deployment
1. **Angular CLI**
    - **ng build**: Build application
    - **ng serve**: Development server
    - **ng test**: Run tests
    - **ng e2e**: End-to-end tests

2. **Environment configuration**
    - **environment.ts**: Development settings
    - **environment.prod.ts**: Production settings
    - **File replacements**: Replace files during build

### Modern Angular Features
1. **Standalone components**
    - **Self-contained**: No module required
    - **Simplified imports**: Direct component imports
    - **Tree-shaking friendly**: Better bundle optimization

2. **Signals (Angular 16+)**
    - **Fine-grained reactivity**: More efficient change detection
    - **Better performance**: Reduced change detection cycles
    - **Simpler state management**: Reactive primitives

3. **Control Flow (Angular 17+)**
    - **@if**: Conditional rendering
    - **@for**: List rendering
    - **@switch**: Switch statements
    - **Better performance**: Compile-time optimizations