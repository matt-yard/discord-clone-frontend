import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <h2>Sorry, an unexpected error occurred.</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
