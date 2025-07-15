import SearchBar from "../searchBar/searchBar";

export default function Hero() {
  return (
    <section className="bg-blue-100 py-16 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
      <p className="mb-6 text-lg">Search thousands of jobs across all categories</p>
      <div className="max-w-xl mx-auto">
        <SearchBar />
      </div>
    </section>
  );
}
