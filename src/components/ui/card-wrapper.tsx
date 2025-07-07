import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import type { CardWrapperProps } from "@/types";

export function CardWrapper({
  headerTitle,
  headerLabel,
  children,
  cardFooter,
}: CardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <header className="w-full flex flex-col items-center gap-y-4 text-center">
          <h1 className="text-3xl font-semibold">{headerTitle}</h1>
          {headerLabel && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {headerLabel}
            </p>
          )}
        </header>
      </CardHeader>

      <CardContent>{children}</CardContent>
      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
}
