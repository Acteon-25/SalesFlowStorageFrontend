export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-semibold text-white">
          SalesFlowStorage &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

