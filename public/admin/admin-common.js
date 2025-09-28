
  const API_BASE = location.origin + "/api";
  const TOKEN_KEY = "ADMIN_TOKEN";

  function saveToken(t){ localStorage.setItem(TOKEN_KEY, t); }
  function getToken(){ return localStorage.getItem(TOKEN_KEY) || ""; }
  function requireAuthOrRedirect(){
    if(!getToken()){ location.href = "/admin/login.html"; }
  }
  async function api(path, { method="GET", body=null, isForm=false } = {}){
    const headers = {};
    if(!isForm) headers["Content-Type"] = "application/json";
    const res = await fetch(API_BASE + path, {
      method,
      headers: { ...headers, Authorization: "Bearer " + getToken() },
      body: body ? (isForm ? body : JSON.stringify(body)) : null
    });
    if(!res.ok){
      const err = await res.json().catch(()=>({message:"Request failed"}));
      throw new Error(err.message || "Request failed");
    }
    return res.json();
  }
