import { PromiseResultShape } from "react-use-promise-matcher";
import { Loader, ErrorWrapper } from "./uikit";
import * as React from "react";

export const matchPromiseResultShape = <T extends unknown>(
  promiseResultShape: PromiseResultShape<T, string>,
  matcher: (data: T) => React.ReactNode
) =>
  promiseResultShape.match({
    Loading: () => <Loader />,
    Rejected: (err) => <ErrorWrapper>{err}</ErrorWrapper>,
    Resolved: matcher,
  });
