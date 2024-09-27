"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const defaultGetTextGenerator = (
  param: string,
  query: ReadonlyURLSearchParams,
) => null;

const pathNameMap: Record<string, string> = {
  poetry: "诗词",
}

const defaultGetDefaultTextGenerator = (path: string) => pathNameMap[path] ?? path;

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery?.split("/").filter((v) => v.length > 0);
};

interface CrumbProps {
  text: string;
  textGenerator?: () => Promise<string>;
  href: string;
  last: boolean;
}

const Crumb: React.FC<CrumbProps> = ({
  text: defaultText,
  textGenerator,
  href,
  last,
}) => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    const generateText = async () => {
      if (textGenerator) {
        const finalText = await textGenerator();
        setText(finalText);
      }
    };
    void generateText();
  }, [textGenerator]);

  if (last) {
    return <BreadcrumbPage>{text}</BreadcrumbPage>;
  }

  return <BreadcrumbLink href={href}>{text}</BreadcrumbLink>;
};

interface MainBreadcrumbProps {
  getTextGenerator?: (
    param: string,
    query: ReadonlyURLSearchParams,
  ) => (() => Promise<string>) | null;
  getDefaultTextGenerator?: (path: string, href: string) => string;
}

export function MainBreadcrumb({
  getTextGenerator = defaultGetTextGenerator,
  getDefaultTextGenerator = defaultGetDefaultTextGenerator,
}: MainBreadcrumbProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const breadcrumbs = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(pathname);
    const title = searchParams.get("title");

    const crumblist = asPathNestedRoutes?.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const isLast = idx === asPathNestedRoutes.length - 1;

      return {
        href,
        textGenerator: getTextGenerator(subpath, searchParams),
        text: isLast && title ? title : getDefaultTextGenerator(subpath, href),
      };
    });

    return [{ href: "/", text: "首页" }, ...(crumblist ?? [])] as {
      href: string;
      textGenerator: (() => Promise<string>) | undefined;
      text: string;
    }[];
  }, [pathname, searchParams, getTextGenerator, getDefaultTextGenerator]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <BreadcrumbItem>
              <Crumb {...crumb} last={idx === breadcrumbs.length - 1} />
            </BreadcrumbItem>
            {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
