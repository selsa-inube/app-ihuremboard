import { ErrorPage } from "@components/layout/ErrorPage";

const ErrorPageContainer = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const codeError = params.get("code");
  return <ErrorPage errorCode={codeError ? Number(codeError) : 404} />;
};

export default ErrorPageContainer;
