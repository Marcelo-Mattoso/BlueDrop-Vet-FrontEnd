import { provideZoneChangeDetection, ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideIcons } from '@ng-icons/core';
import { 
  heroMagnifyingGlass,
  heroPlus,
  heroBellAlert,
  heroBriefcase,
  heroHeart,
  heroUsers,
  heroCalendarDays,
  heroCreditCard,
  heroDocumentChartBar,
  heroCog6Tooth,
  heroArrowLeftOnRectangle,
  heroChevronRight
} from '@ng-icons/heroicons/outline';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({
      heroMagnifyingGlass,
      heroPlus,
      heroBellAlert,
      heroBriefcase,
      heroHeart,
      heroUsers,
      heroCalendarDays,
      heroCreditCard,
      heroDocumentChartBar,
      heroCog6Tooth,
      heroArrowLeftOnRectangle,
      heroChevronRight
    })
  ]
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
