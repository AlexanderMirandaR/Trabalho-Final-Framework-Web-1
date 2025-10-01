const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-900 border border-red-700 text-white px-6 py-4 rounded-lg max-w-md">
        <div className="flex items-center">
          <span className="text-2xl mr-3">⚠️</span>
          <div>
            <h3 className="font-bold text-lg mb-1">Erro</h3>
            <p>{message || "Ocorreu um erro ao carregar os dados."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
