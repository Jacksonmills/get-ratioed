'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import useWindow from '../(hooks)/useWindow';
import { Menu } from 'lucide-react';

export function NavMenu() {
  const { isMobile } = useWindow();

  if (isMobile === null) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {isMobile ? (
            <NavigationMenuTrigger>
              <Menu />
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          )}
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Make your own!
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create your own custom tweet ratio comparison.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="/reply" title="Reply Example">
                When a reply tweet has more likes than the original tweet.
              </ListItem>
              <ListItem href="/quoted" title="Quoted Example">
                When a tweet has more likes than the quoted tweet.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
