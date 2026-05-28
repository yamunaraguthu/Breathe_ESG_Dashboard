import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [industry, setIndustry] = useState("");
  const [editIndustry, setEditIndustry] = useState("");
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [approvedCompanies, setApprovedCompanies] = useState([]);

  const fetchCompanies = async () => {
    const response = await fetch(`${BASE_URL}/api/companies/`);
    const data = await response.json();
    setCompanies(data);
  };

  const approveCompany = (id) => {
    setApprovedCompanies([...approvedCompanies, id]);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const addCompany = async () => {
    await fetch(`${BASE_URL}/api/companies/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, industry: industry }),
    });
    fetchCompanies();
    toast.success("Company Added Successfully");
    setName("");
    setIndustry("");
    setSourceType("");
  };

  const uploadCSV = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${BASE_URL}/api/datasources/upload_csv/`, {
      method: "POST",
      body: formData,
    });
    toast.success("CSV Uploaded Successfully");
    await fetchCompanies();
  };

  const deleteCompany = async (id) => {
    await fetch(`${BASE_URL}/api/companies/${id}/`, {
      method: "DELETE",
    });
    fetchCompanies();
  };

  const updateCompany = async (id, companyName, companyIndustry) => {
    await fetch(`${BASE_URL}/api/companies/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName || companyName,
        industry: editIndustry || companyIndustry,
      }),
    });
    fetchCompanies();
    setEditIndustry("");
    setEditId(null);
  };

  return (
    <>
      <div className={darkMode ? "min-h-screen bg-[#020c2b] flex flex-col items-center gap-6 p-10 text-white" : "min-h-screen bg-gray-200 flex flex-col items-center gap-6 p-10 text-black"}>
        <h1 className="text-6xl font-bold text-center mb-10">Companies</h1>
        <input className="border p-3 rounded-lg bg-white text-black w-80" type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-3 rounded-lg bg-white text-black w-80" type="text" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className="bg-white text-black p-1 rounded-lg w-80 mb-5 border border-gray-400">
    
          <option value="">Select Source</option>
          <option value="SAP">SAP</option>
          <option value="Utility">Utility</option>
          <option value="Travel">Travel</option>
        </select>
        <br /><br /><br />
        <button onClick={addCompany} className="bg-blue-500 hover:bg-blue-700 px-4 py-3 rounded-lg">Add Company</button>
        <input className="border p-3 rounded-lg bg-white text-black w-80" type="text" placeholder="Search Company" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex items-center gap-3 mb-5">
          <label className="bg-white text-black px-5 py-3 rounded-lg cursor-pointer border border-gray-400">
            Choose File
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
          </label>
          <span className="text-white">{file ? file.name : "No file chosen"}</span>
        </div>
        <button onClick={uploadCSV} className="bg-green-500 hover:bg-green-700 px-5 py-3 rounded-lg text-white mb-5">Upload CSV</button>
        {companies.length > 0 && (
          <div className="flex justify-center my-5 border border-gray-500 rounded-xl p-3 shadow-lg">
            <div className="bg-white text-black p-5 rounded-xl shadow-lg w-40 h-40 flex flex-col justify-center text-center mb-5">
              <h2 className="text-3xl font-bold">{companies.length}</h2>
              <p className="text-lg">Total Companies</p>
            </div>
            <BarChart width={700} height={400} data={companies.filter((company) => company.name.toLowerCase().includes(search.toLowerCase()))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="id" fill="#2217f0" />
            </BarChart>
            <PieChart width={300} height={300}>
              <Pie data={companies} dataKey="id" cx="50%" cy="50%" outerRadius={80}>
                {companies.map((entry, index) => (
                  <Cell key={index} fill={["#06B6D4", "#6366F1", "#EC4899", "#22C55E"][index % 4]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        )}
        <hr />
        {companies.length === 0 && <h2 className="text-white text-2xl mt-10 text-center">No Companies Found</h2>}
        {companies.filter((company) => company.name.toLowerCase().includes(search.toLowerCase())).map((company) => (
          <div key={company.id} className="bg-white text-black p-7 rounded-xl my-4 w-full max-w-xl shadow-lg mx-auto flex-col gap-4">
            <h3 className="text-2xl font-bold">{company.name}</h3>
            <p className="text-gray-700 text-lg">{company.industry}</p>
            <p className="mt-3">Status:<span className="text-yellow-400 font-bold ml-2">Pending</span></p>
            <button onClick={() => approveCompany(company.id)} className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg mt-4">
              {approvedCompanies.includes(company.id) ? "Approved" : "Approve"}
            </button>
            <button onClick={() => deleteCompany(company.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-3">Delete</button>
            <br /><br />
            <input className="border p-2 rounded-lg bg-white text-black" type="text" placeholder="New Industry" value={editId === company.id ? editIndustry : ""} onChange={(e) => { setEditId(company.id); setEditIndustry(e.target.value); }} />
            <br /><br />
            <input className="border p-2 rounded-lg bg-white text-black w-full" type="text" placeholder="New Company Name" value={editId === company.id ? editName : ""} onChange={(e) => { setEditId(company.id); setEditName(e.target.value); }} />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg mt-3" onClick={() => updateCompany(company.id, company.name, company.industry)}>Update</button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
