import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentModule } from './content/content.module';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule } from 'ngx-socket-io';
import { LiveCodeComponent } from './sidebar/live-code/live-code.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    ContentModule,
    FooterComponent,
    LiveCodeComponent,
    AppRoutingModule,
    SocketIoModule.forRoot({
      url: 'http://85.93.88.200:4444',
      options: {},
    }),
    HighlightModule,
  ],
  declarations: [AppComponent, MatIconModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          scss: () => import('highlight.js/lib/languages/scss'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
        },
        themePath: 'assets/styles/atom-one-dark.css',
      }
    }
  ],
})
export class AppModule {}
