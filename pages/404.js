const Error404Page = () => (
  <div className="main-page min-h-screen flex items-center justify-center mb-4">
    <div className="container mx-auto px-4 flex flex-col flex-1 items-center justify-center text-center">
      <h1 className="text-6xl xl:text-9xl font-bold">404</h1>
      <h2 className="text-4xl xl:text-6xl font-semibold mt-4">
        Page not found
      </h2>
      <p className="text-center text-2xl my-8">Meoooo! Something is wrong.</p>
    </div>

    <style jsx>{`
      .main-page {
        background: url("/static/stock/sydney-harbour.jpg") no-repeat top center
          #fff;
        background-size: cover;
        object-fit: cover;
        object-position: center;
      }
    `}</style>
  </div>
);

export default Error404Page;
