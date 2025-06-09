import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HEADERS, Route, ROUTES } from './data';
import { ArrowComponent } from './arrow/arrow.component';
import { CommonModule } from '@angular/common';

interface Header {
  name: keyof Route;
  title: string;
  sortFn: (a: string, b: string) => number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ArrowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  headers$ = new BehaviorSubject<Header[]>(HEADERS.map((h) => ({ ...h })));

  routes$ = new BehaviorSubject<Route[]>([...ROUTES]);

  lastFilter$ = new BehaviorSubject<{
    name: keyof Route | null;
    direction: 'asc' | 'desc';
    sortFn: (a: string, b: string) => number;
  }>({
    name: null,
    direction: 'asc',
    sortFn: () => 0,
  });

  sortedRoutes$ = combineLatest([
    this.headers$,
    this.routes$,
    this.lastFilter$,
  ]).pipe(
    map(([headers, routes, lastFilter]) => {
      if (!lastFilter.name) return routes;

      const headerExists = headers.find((h) => h.name === lastFilter.name);
      if (!headerExists) return routes;

      return [...routes].sort((a, b) => {
        const aValue = a[lastFilter.name!];
        const bValue = b[lastFilter.name!];
        return lastFilter.direction === 'asc'
          ? lastFilter.sortFn(aValue as string, bValue as string)
          : lastFilter.sortFn(bValue as string, aValue as string);
      });
    })
  );

  ngOnInit(): void {}

  onSort(header: Header) {
    const current = this.lastFilter$.getValue();
    const newFilter = {
      name: header.name,
      direction: current.direction,
      sortFn: header.sortFn,
    };

    if (current.name === header.name) {
      newFilter.direction = current.direction === 'asc' ? 'desc' : 'asc';
    } else {
      newFilter.direction = 'asc';
    }

    this.lastFilter$.next(newFilter);
  }

  getDirection(headerName: keyof Route): 'asc' | 'desc' | null {
    const current = this.lastFilter$.getValue();
    return current.name === headerName ? current.direction : null;
  }

  getRouteValue(route: Route, propertyName: keyof Route): string {
    return route[propertyName];
  }

  updateHeaders(newHeaders: Header[]) {
    this.headers$.next(newHeaders.map((h) => ({ ...h })));
  }

  updateRoutes(newRoutes: Route[]) {
    this.routes$.next([...newRoutes]);
  }
}
