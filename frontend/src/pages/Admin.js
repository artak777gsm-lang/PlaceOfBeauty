import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL || "";

function Admin() {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("services");

  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [salonInfo, setSalonInfo] = useState(null);
  const [homepage, setHomepage] = useState(null);

  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const headers = auth ? { Authorization: `Basic ${auth}` } : {};

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const login = async (e) => {
    e.preventDefault();
    const token = btoa(`${user}:${pass}`);
    try {
      await axios.get(`${API}/api/admin/me`, { headers: { Authorization: `Basic ${token}` } });
      setAuth(token);
      setLoginError("");
    } catch {
      setLoginError("Nieprawidłowy login lub hasło");
    }
  };

  const loadData = useCallback(async () => {
    if (!auth) return;
    try {
      const [svc, rev, gal, info, hp] = await Promise.all([
        axios.get(`${API}/api/services`),
        axios.get(`${API}/api/reviews`),
        axios.get(`${API}/api/gallery`),
        axios.get(`${API}/api/salon-info`),
        axios.get(`${API}/api/homepage`),
      ]);
      setServices(svc.data);
      setReviews(rev.data);
      setGallery(gal.data);
      setSalonInfo(info.data);
      setHomepage(hp.data);
    } catch (err) {
      console.error("Load error:", err);
    }
  }, [auth]);

  useEffect(() => { loadData(); }, [loadData]);

  // --- SERVICE CRUD ---
  const saveService = async (data) => {
    setSaving(true);
    try {
      if (data.id && services.find(s => s.id === data.id)) {
        await axios.put(`${API}/api/admin/services/${data.id}`, data, { headers });
        showMsg("Usługa zaktualizowana");
      } else {
        await axios.post(`${API}/api/admin/services`, data, { headers });
        showMsg("Usługa dodana");
      }
      await loadData();
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      showMsg("Błąd: " + (err.response?.data?.detail || err.message));
    }
    setSaving(false);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Usunąć usługę?")) return;
    await axios.delete(`${API}/api/admin/services/${id}`, { headers });
    showMsg("Usługa usunięta");
    await loadData();
  };

  // --- REVIEW CRUD ---
  const saveReview = async (data) => {
    setSaving(true);
    try {
      if (data.id && reviews.find(r => r.id === data.id)) {
        await axios.put(`${API}/api/admin/reviews/${data.id}`, data, { headers });
        showMsg("Opinia zaktualizowana");
      } else {
        await axios.post(`${API}/api/admin/reviews`, data, { headers });
        showMsg("Opinia dodana");
      }
      await loadData();
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      showMsg("Błąd: " + (err.response?.data?.detail || err.message));
    }
    setSaving(false);
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Usunąć opinię?")) return;
    await axios.delete(`${API}/api/admin/reviews/${id}`, { headers });
    showMsg("Opinia usunięta");
    await loadData();
  };

  // --- GALLERY CRUD ---
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${API}/api/admin/upload`, formData, {
      headers: { ...headers, "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  };

  const saveGalleryItem = async (data, file) => {
    setSaving(true);
    try {
      let url = data.url;
      if (file) {
        url = await uploadImage(file);
        data.url = url;
      }
      if (data.id && gallery.find(g => g.id === data.id)) {
        await axios.put(`${API}/api/admin/gallery/${data.id}`, data, { headers });
        showMsg("Zdjęcie zaktualizowane");
      } else {
        await axios.post(`${API}/api/admin/gallery`, data, { headers });
        showMsg("Zdjęcie dodane");
      }
      await loadData();
      setShowForm(false);
      setEditItem(null);
    } catch (err) {
      showMsg("Błąd: " + (err.response?.data?.detail || err.message));
    }
    setSaving(false);
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Usunąć zdjęcie?")) return;
    await axios.delete(`${API}/api/admin/gallery/${id}`, { headers });
    showMsg("Zdjęcie usunięte");
    await loadData();
  };

  // --- SALON INFO ---
  const saveSalonInfo = async (data) => {
    setSaving(true);
    try {
      await axios.put(`${API}/api/admin/salon-info`, data, { headers });
      showMsg("Informacje zapisane");
      await loadData();
    } catch (err) {
      showMsg("Błąd: " + (err.response?.data?.detail || err.message));
    }
    setSaving(false);
  };

  // --- HOMEPAGE ---
  const saveHomepage = async (data) => {
    setSaving(true);
    try {
      await axios.put(`${API}/api/admin/homepage`, data, { headers });
      showMsg("Strona główna zapisana");
      await loadData();
    } catch (err) {
      showMsg("Błąd: " + (err.response?.data?.detail || err.message));
    }
    setSaving(false);
  };

  const uploadHomepageImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${API}/api/admin/upload`, formData, {
      headers: { ...headers, "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  };

  // ==================== LOGIN SCREEN ====================
  if (!auth) {
    return (
      <div style={styles.loginWrap}>
        <form onSubmit={login} style={styles.loginForm}>
          <h1 style={styles.loginTitle}>Panel Administracyjny</h1>
          <p style={styles.loginSub}>Place of Beauty</p>
          {loginError && <p style={styles.error}>{loginError}</p>}
          <input style={styles.input} placeholder="Login" value={user} onChange={e => setUser(e.target.value)} />
          <input style={styles.input} placeholder="Hasło" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          <button style={styles.btnPrimary} type="submit">Zaloguj się</button>
        </form>
      </div>
    );
  }

  // ==================== ADMIN PANEL ====================
  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Panel Administracyjny</h1>
        <button style={styles.btnLogout} onClick={() => setAuth(null)}>Wyloguj</button>
      </div>

      {/* Message */}
      {message && <div style={styles.toast}>{message}</div>}

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          ["homepage", "Strona główna"],
          ["services", "Usługi"],
          ["reviews", "Opinie"],
          ["gallery", "Galeria"],
          ["salon", "Informacje o salonie"],
        ].map(([key, label]) => (
          <button key={key} style={tab === key ? styles.tabActive : styles.tab}
            onClick={() => { setTab(key); setShowForm(false); setEditItem(null); }}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {tab === "services" && (
          <ServicesTab
            services={services}
            showForm={showForm}
            editItem={editItem}
            saving={saving}
            onAdd={() => { setEditItem(null); setShowForm(true); }}
            onEdit={(s) => { setEditItem(s); setShowForm(true); }}
            onDelete={deleteService}
            onSave={saveService}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
          />
        )}
        {tab === "reviews" && (
          <ReviewsTab
            reviews={reviews}
            showForm={showForm}
            editItem={editItem}
            saving={saving}
            onAdd={() => { setEditItem(null); setShowForm(true); }}
            onEdit={(r) => { setEditItem(r); setShowForm(true); }}
            onDelete={deleteReview}
            onSave={saveReview}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
          />
        )}
        {tab === "gallery" && (
          <GalleryTab
            gallery={gallery}
            showForm={showForm}
            editItem={editItem}
            saving={saving}
            onAdd={() => { setEditItem(null); setShowForm(true); }}
            onEdit={(g) => { setEditItem(g); setShowForm(true); }}
            onDelete={deleteGalleryItem}
            onSave={saveGalleryItem}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
          />
        )}
        {tab === "salon" && salonInfo && (
          <SalonTab info={salonInfo} saving={saving} onSave={saveSalonInfo} />
        )}
        {tab === "homepage" && homepage && (
          <HomepageTab content={homepage} saving={saving} onSave={saveHomepage} onUpload={uploadHomepageImage} />
        )}
      </div>
    </div>
  );
}

// ==================== SERVICES TAB ====================
function ServicesTab({ services, showForm, editItem, saving, onAdd, onEdit, onDelete, onSave, onCancel }) {
  const categories = [...new Set(services.map(s => s.category))];
  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>Usługi ({services.length})</h2>
        <button style={styles.btnPrimary} onClick={onAdd}>+ Dodaj usługę</button>
      </div>
      {showForm && (
        <ServiceForm item={editItem} saving={saving} onSave={onSave} onCancel={onCancel} categories={categories} />
      )}
      <div style={styles.table}>
        <div style={{ ...styles.tableRow, ...styles.tableHeader }}>
          <span style={styles.cellCat}>Kategoria</span>
          <span style={styles.cellName}>Nazwa</span>
          <span style={styles.cellPrice}>Cena</span>
          <span style={styles.cellDur}>Czas</span>
          <span style={styles.cellActions}>Akcje</span>
        </div>
        {services.map(s => (
          <div key={s.id} style={styles.tableRow}>
            <span style={styles.cellCat}>{s.category}</span>
            <span style={styles.cellName}>{s.name}</span>
            <span style={styles.cellPrice}>{s.price}</span>
            <span style={styles.cellDur}>{s.duration}</span>
            <span style={styles.cellActions}>
              <button style={styles.btnSmall} onClick={() => onEdit(s)}>Edytuj</button>
              <button style={styles.btnSmallDanger} onClick={() => onDelete(s.id)}>Usuń</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceForm({ item, saving, onSave, onCancel, categories }) {
  const [form, setForm] = useState(item || { category: "", name: "", description: "", price: "", duration: "" });
  const [newCat, setNewCat] = useState("");
  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div style={styles.formCard}>
      <h3 style={styles.formTitle}>{item ? "Edytuj usługę" : "Nowa usługa"}</h3>
      <div style={styles.formGrid}>
        <div>
          <label style={styles.label}>Kategoria</label>
          <select style={styles.input} value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="">Wybierz...</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
            <option value="__new">+ Nowa kategoria</option>
          </select>
          {form.category === "__new" && (
            <input style={{ ...styles.input, marginTop: 8 }} placeholder="Nazwa kategorii"
              value={newCat} onChange={e => setNewCat(e.target.value)} />
          )}
        </div>
        <div>
          <label style={styles.label}>Nazwa</label>
          <input style={styles.input} value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div>
          <label style={styles.label}>Cena</label>
          <input style={styles.input} value={form.price} onChange={e => set("price", e.target.value)} placeholder="np. 120 zł" />
        </div>
        <div>
          <label style={styles.label}>Czas trwania</label>
          <input style={styles.input} value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="np. 1 godz." />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={styles.label}>Opis</label>
          <textarea style={{ ...styles.input, minHeight: 60 }} value={form.description} onChange={e => set("description", e.target.value)} />
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.btnPrimary} disabled={saving}
          onClick={() => onSave({ ...form, category: form.category === "__new" ? newCat : form.category })}>
          {saving ? "Zapisywanie..." : "Zapisz"}
        </button>
        <button style={styles.btnSecondary} onClick={onCancel}>Anuluj</button>
      </div>
    </div>
  );
}

// ==================== REVIEWS TAB ====================
function ReviewsTab({ reviews, showForm, editItem, saving, onAdd, onEdit, onDelete, onSave, onCancel }) {
  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>Opinie ({reviews.length})</h2>
        <button style={styles.btnPrimary} onClick={onAdd}>+ Dodaj opinię</button>
      </div>
      {showForm && (
        <ReviewForm item={editItem} saving={saving} onSave={onSave} onCancel={onCancel} />
      )}
      <div style={styles.table}>
        <div style={{ ...styles.tableRow, ...styles.tableHeader }}>
          <span style={styles.cellName}>Imię</span>
          <span style={styles.cellCat}>Usługa</span>
          <span style={{ ...styles.cellName, flex: 2 }}>Tekst</span>
          <span style={styles.cellDur}>Ocena</span>
          <span style={styles.cellActions}>Akcje</span>
        </div>
        {reviews.map(r => (
          <div key={r.id} style={styles.tableRow}>
            <span style={styles.cellName}>{r.name}</span>
            <span style={styles.cellCat}>{r.service}</span>
            <span style={{ ...styles.cellName, flex: 2 }}>{r.text.substring(0, 60)}{r.text.length > 60 ? "..." : ""}</span>
            <span style={styles.cellDur}>{"★".repeat(r.rating)}</span>
            <span style={styles.cellActions}>
              <button style={styles.btnSmall} onClick={() => onEdit(r)}>Edytuj</button>
              <button style={styles.btnSmallDanger} onClick={() => onDelete(r.id)}>Usuń</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ item, saving, onSave, onCancel }) {
  const [form, setForm] = useState(item || { name: "", date: "", service: "", text: "", rating: 5 });
  const set = (k, v) => setForm({ ...form, [k]: v });
  return (
    <div style={styles.formCard}>
      <h3 style={styles.formTitle}>{item ? "Edytuj opinię" : "Nowa opinia"}</h3>
      <div style={styles.formGrid}>
        <div>
          <label style={styles.label}>Imię</label>
          <input style={styles.input} value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div>
          <label style={styles.label}>Data</label>
          <input style={styles.input} value={form.date} onChange={e => set("date", e.target.value)} placeholder="np. marzec 2026" />
        </div>
        <div>
          <label style={styles.label}>Usługa</label>
          <input style={styles.input} value={form.service} onChange={e => set("service", e.target.value)} />
        </div>
        <div>
          <label style={styles.label}>Ocena (1-5)</label>
          <select style={styles.input} value={form.rating} onChange={e => set("rating", parseInt(e.target.value))}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} {"★".repeat(n)}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={styles.label}>Tekst opinii</label>
          <textarea style={{ ...styles.input, minHeight: 80 }} value={form.text} onChange={e => set("text", e.target.value)} />
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.btnPrimary} disabled={saving} onClick={() => onSave(form)}>
          {saving ? "Zapisywanie..." : "Zapisz"}
        </button>
        <button style={styles.btnSecondary} onClick={onCancel}>Anuluj</button>
      </div>
    </div>
  );
}

// ==================== GALLERY TAB ====================
function GalleryTab({ gallery, showForm, editItem, saving, onAdd, onEdit, onDelete, onSave, onCancel }) {
  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>Galeria ({gallery.length})</h2>
        <button style={styles.btnPrimary} onClick={onAdd}>+ Dodaj zdjęcie</button>
      </div>
      {showForm && (
        <GalleryForm item={editItem} saving={saving} onSave={onSave} onCancel={onCancel} />
      )}
      <div style={styles.galleryGrid}>
        {gallery.map(g => (
          <div key={g.id} style={styles.galleryCard}>
            <img src={g.url} alt={g.alt} style={styles.galleryImg} />
            <div style={styles.galleryInfo}>
              <span style={styles.galleryAlt}>{g.alt}</span>
              <span style={styles.galleryCat}>{g.category}</span>
              <div style={styles.galleryActions}>
                <button style={styles.btnSmall} onClick={() => onEdit(g)}>Edytuj</button>
                <button style={styles.btnSmallDanger} onClick={() => onDelete(g.id)}>Usuń</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryForm({ item, saving, onSave, onCancel }) {
  const [form, setForm] = useState(item || { url: "", alt: "", category: "Paznokcie" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(item?.url || "");
  const set = (k, v) => setForm({ ...form, [k]: v });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  return (
    <div style={styles.formCard}>
      <h3 style={styles.formTitle}>{item ? "Edytuj zdjęcie" : "Nowe zdjęcie"}</h3>
      <div style={styles.formGrid}>
        <div>
          <label style={styles.label}>Zdjęcie</label>
          <input type="file" accept="image/*" onChange={handleFile} style={styles.input} />
          {preview && <img src={preview} alt="Preview" style={{ maxHeight: 120, marginTop: 8, borderRadius: 8 }} />}
        </div>
        <div>
          <label style={styles.label}>Kategoria</label>
          <select style={styles.input} value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="Paznokcie">Paznokcie</option>
            <option value="Zabiegi">Zabiegi</option>
            <option value="Salon">Salon</option>
          </select>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={styles.label}>Opis (alt)</label>
          <input style={styles.input} value={form.alt} onChange={e => set("alt", e.target.value)} placeholder="Opis zdjęcia" />
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.btnPrimary} disabled={saving} onClick={() => onSave(form, file)}>
          {saving ? "Zapisywanie..." : "Zapisz"}
        </button>
        <button style={styles.btnSecondary} onClick={onCancel}>Anuluj</button>
      </div>
    </div>
  );
}

// ==================== SALON INFO TAB ====================
function SalonTab({ info, saving, onSave }) {
  const [form, setForm] = useState({ ...info });
  const set = (k, v) => setForm({ ...form, [k]: v });
  const setHour = (day, val) => setForm({ ...form, hours: { ...form.hours, [day]: val } });

  return (
    <div>
      <h2 style={styles.sectionTitle}>Informacje o salonie</h2>
      <div style={styles.formCard}>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Nazwa salonu</label>
            <input style={styles.input} value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Adres</label>
            <input style={styles.input} value={form.address} onChange={e => set("address", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Telefon</label>
            <input style={styles.input} value={form.phone} onChange={e => set("phone", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <input style={styles.input} value={form.email} onChange={e => set("email", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Ocena</label>
            <input style={styles.input} type="number" step="0.1" value={form.rating} onChange={e => set("rating", parseFloat(e.target.value))} />
          </div>
          <div>
            <label style={styles.label}>Liczba opinii</label>
            <input style={styles.input} type="number" value={form.reviews_count} onChange={e => set("reviews_count", parseInt(e.target.value))} />
          </div>
          <div>
            <label style={styles.label}>Booksy URL</label>
            <input style={styles.input} value={form.booksy_url} onChange={e => set("booksy_url", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Facebook URL</label>
            <input style={styles.input} value={form.facebook_url} onChange={e => set("facebook_url", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Opis</label>
            <textarea style={{ ...styles.input, minHeight: 80 }} value={form.description} onChange={e => set("description", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Udogodnienia (przez przecinek)</label>
            <input style={styles.input} value={form.amenities?.join(", ")} onChange={e => set("amenities", e.target.value.split(",").map(a => a.trim()))} />
          </div>
        </div>

        <h3 style={{ ...styles.formTitle, marginTop: 24 }}>Godziny otwarcia</h3>
        <div style={styles.hoursGrid}>
          {Object.entries(form.hours || {}).map(([day, hours]) => (
            <div key={day} style={styles.hourRow}>
              <span style={styles.hourDay}>{day}</span>
              <input style={{ ...styles.input, flex: 1 }} value={hours} onChange={e => setHour(day, e.target.value)} />
            </div>
          ))}
        </div>

        <div style={{ ...styles.formActions, marginTop: 24 }}>
          <button style={styles.btnPrimary} disabled={saving} onClick={() => onSave(form)}>
            {saving ? "Zapisywanie..." : "Zapisz zmiany"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== HOMEPAGE TAB ====================
function HomepageTab({ content, saving, onSave, onUpload }) {
  const [form, setForm] = useState({ ...content });
  const [heroPreview, setHeroPreview] = useState(content?.hero_image || "");
  const [ctaPreview, setCtaPreview] = useState(content?.cta_image || "");
  const [heroFile, setHeroFile] = useState(null);
  const [ctaFile, setCtaFile] = useState(null);

  const set = (k, v) => setForm({ ...form, [k]: v });
  const setFeature = (idx, key, val) => {
    const newFeatures = [...form.features];
    newFeatures[idx] = { ...newFeatures[idx], [key]: val };
    setForm({ ...form, features: newFeatures });
  };

  const handleHeroFile = (e) => {
    const f = e.target.files[0];
    if (f) { setHeroFile(f); setHeroPreview(URL.createObjectURL(f)); }
  };
  const handleCtaFile = (e) => {
    const f = e.target.files[0];
    if (f) { setCtaFile(f); setCtaPreview(URL.createObjectURL(f)); }
  };

  const handleSave = async () => {
    let data = { ...form };
    if (heroFile) {
      data.hero_image = await onUpload(heroFile);
    }
    if (ctaFile) {
      data.cta_image = await onUpload(ctaFile);
    }
    onSave(data);
  };

  return (
    <div>
      <h2 style={styles.sectionTitle}>Strona główna</h2>

      {/* Hero Section */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Sekcja Hero (baner główny)</h3>
        <div style={styles.formGrid}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Zdjęcie główne</label>
            <input type="file" accept="image/*" onChange={handleHeroFile} style={styles.input} />
            {heroPreview && (
              <img src={heroPreview} alt="Hero preview" style={{ maxHeight: 200, marginTop: 8, borderRadius: 8, width: "100%", objectFit: "cover" }} />
            )}
            <p style={{ fontSize: 11, color: "#a8a29e", marginTop: 4 }}>
              Lub wставьте URL:
            </p>
            <input style={styles.input} value={form.hero_image} onChange={e => set("hero_image", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label style={styles.label}>Подзаголовок (над заголовком)</label>
            <input style={styles.input} value={form.hero_subtitle} onChange={e => set("hero_subtitle", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Заголовок (основной текст)</label>
            <input style={styles.input} value={form.hero_title} onChange={e => set("hero_title", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Акцентное слово (курсивом)</label>
            <input style={styles.input} value={form.hero_title_accent} onChange={e => set("hero_title_accent", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Описание</label>
            <textarea style={{ ...styles.input, minHeight: 60 }} value={form.hero_description} onChange={e => set("hero_description", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Преимущества (3 блока под баннером)</h3>
        {form.features?.map((f, i) => (
          <div key={i} style={{ ...styles.formGrid, marginBottom: 12 }}>
            <div>
              <label style={styles.label}>Заголовок {i + 1}</label>
              <input style={styles.input} value={f.title} onChange={e => setFeature(i, "title", e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Описание {i + 1}</label>
              <input style={styles.input} value={f.desc} onChange={e => setFeature(i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Секция "Запишись" (CTA)</h3>
        <div style={styles.formGrid}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Фоновое фото</label>
            <input type="file" accept="image/*" onChange={handleCtaFile} style={styles.input} />
            {ctaPreview && (
              <img src={ctaPreview} alt="CTA preview" style={{ maxHeight: 150, marginTop: 8, borderRadius: 8, width: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div>
            <label style={styles.label}>Подзаголовок</label>
            <input style={styles.input} value={form.cta_subtitle} onChange={e => set("cta_subtitle", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Заголовок</label>
            <input style={styles.input} value={form.cta_title} onChange={e => set("cta_title", e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Акцентное слово</label>
            <input style={styles.input} value={form.cta_title_accent} onChange={e => set("cta_title_accent", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={styles.label}>Описание</label>
            <textarea style={{ ...styles.input, minHeight: 60 }} value={form.cta_description} onChange={e => set("cta_description", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={styles.formActions}>
        <button style={styles.btnPrimary} disabled={saving} onClick={handleSave}>
          {saving ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  loginWrap: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#1c1917", fontFamily: "'Manrope', sans-serif",
  },
  loginForm: {
    background: "#292524", padding: 40, borderRadius: 16, width: 360,
    display: "flex", flexDirection: "column", gap: 16,
  },
  loginTitle: { color: "#b49b67", fontSize: 24, fontFamily: "'Playfair Display', serif", margin: 0, textAlign: "center" },
  loginSub: { color: "#a8a29e", fontSize: 14, textAlign: "center", margin: 0 },
  error: { color: "#ef4444", fontSize: 14, textAlign: "center", margin: 0 },

  wrap: {
    minHeight: "100vh", background: "#fafaf9", fontFamily: "'Manrope', sans-serif",
  },
  header: {
    background: "#1c1917", padding: "16px 32px", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  headerTitle: { color: "#b49b67", fontSize: 20, fontFamily: "'Playfair Display', serif", margin: 0 },
  btnLogout: {
    background: "transparent", border: "1px solid #57534e", color: "#a8a29e",
    padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13,
  },

  toast: {
    position: "fixed", top: 20, right: 20, background: "#22c55e", color: "#fff",
    padding: "12px 24px", borderRadius: 8, fontSize: 14, zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  tabs: { display: "flex", gap: 0, borderBottom: "2px solid #e7e5e4", padding: "0 32px" },
  tab: {
    padding: "12px 24px", background: "transparent", border: "none",
    color: "#78716c", cursor: "pointer", fontSize: 14, borderBottom: "2px solid transparent",
    marginBottom: -2,
  },
  tabActive: {
    padding: "12px 24px", background: "transparent", border: "none",
    color: "#b49b67", cursor: "pointer", fontSize: 14, fontWeight: 600,
    borderBottom: "2px solid #b49b67", marginBottom: -2,
  },

  content: { padding: 32, maxWidth: 1200, margin: "0 auto" },

  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionTitle: { fontSize: 20, color: "#1c1917", margin: 0 },

  table: { border: "1px solid #e7e5e4", borderRadius: 12, overflow: "hidden" },
  tableRow: { display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #e7e5e4", gap: 8 },
  tableHeader: { background: "#f5f5f4", fontWeight: 600, fontSize: 13, color: "#78716c" },
  cellCat: { flex: 1, fontSize: 13, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" },
  cellName: { flex: 1.5, fontSize: 13, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" },
  cellPrice: { width: 90, fontSize: 13, flexShrink: 0 },
  cellDur: { width: 100, fontSize: 13, flexShrink: 0 },
  cellActions: { width: 140, display: "flex", gap: 6, flexShrink: 0 },

  formCard: { background: "#fff", border: "1px solid #e7e5e4", borderRadius: 12, padding: 24, marginBottom: 24 },
  formTitle: { fontSize: 16, fontWeight: 600, color: "#1c1917", margin: "0 0 16px 0" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  formActions: { display: "flex", gap: 12, marginTop: 16 },

  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#78716c", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" },
  input: {
    width: "100%", padding: "10px 12px", border: "1px solid #d6d3d1", borderRadius: 8,
    fontSize: 14, outline: "none", fontFamily: "'Manrope', sans-serif",
    boxSizing: "border-box", background: "#fff",
  },

  btnPrimary: {
    background: "#b49b67", color: "#fff", border: "none", padding: "10px 20px",
    borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600,
  },
  btnSecondary: {
    background: "#f5f5f4", color: "#57534e", border: "1px solid #d6d3d1",
    padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14,
  },
  btnSmall: {
    background: "#f5f5f4", color: "#1c1917", border: "1px solid #d6d3d1",
    padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12,
  },
  btnSmallDanger: {
    background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca",
    padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12,
  },

  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
  galleryCard: { border: "1px solid #e7e5e4", borderRadius: 12, overflow: "hidden", background: "#fff" },
  galleryImg: { width: "100%", height: 160, objectFit: "cover" },
  galleryInfo: { padding: 12, display: "flex", flexDirection: "column", gap: 4 },
  galleryAlt: { fontSize: 12, color: "#57534e" },
  galleryCat: { fontSize: 11, color: "#b49b67", fontWeight: 600, textTransform: "uppercase" },
  galleryActions: { display: "flex", gap: 6, marginTop: 8 },

  hoursGrid: { display: "flex", flexDirection: "column", gap: 8 },
  hourRow: { display: "flex", alignItems: "center", gap: 16 },
  hourDay: { width: 120, fontSize: 14, color: "#1c1917", fontWeight: 500 },
};

export default Admin;
