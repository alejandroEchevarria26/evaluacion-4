"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  categories,
  initialProducts,
  reviews,
  type Category,
  type Product,
  type ProductCategory,
} from "../data/products";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const WHATSAPP_NUMBER = "56963732988";
const INSTAGRAM_URL = "https://www.instagram.com/tortas_kelita?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const withBasePath = (path: string) => {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

const heroBackgroundImage = withBasePath("/images/birthday-pink.jpeg");

const emptyProductForm = {
  name: "",
  description: "",
  price: "",
  category: "Tortas" as ProductCategory,
  stock: "",
  portions: "",
  occasions: "",
};
type ProductFormState = typeof emptyProductForm;

const emptyOrderForm = {
  name: "",
  phone: "",
  event: "",
  product: "",
  quantity: "",
  date: "",
  details: "",
};
type OrderFormState = typeof emptyOrderForm;

type AdminUser = {
  usuario: string;
  nombre: string;
  rol: string;
};

type Pedido = {
  id: string;
  nombreCliente: string;
  telefono: string;
  evento: string;
  productoNombre: string;
  cantidad: number;
  fechaDeseada: string;
  detalles?: string;
  estado: string;
  totalEstimado: number;
  origen: string;
  createdAt?: string;
};

type Cliente = {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
  origen?: string;
  createdAt?: string;
};

type Boleta = {
  id: string;
  numero: number;
  clienteNombre: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  createdAt?: string;
};

type DashboardResumen = {
  productos: number;
  clientes: number;
  pedidos: number;
  boletas: number;
  totalStock: number;
  stockBajo: number;
  pedidosPendientes: number;
  ventas: number;
};

function formatPrice(product: Product | { price: number; pricePrefix?: string }) {
  const price = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(product.price);

  return product.pricePrefix ? `${product.pricePrefix} ${price}` : price;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function Header({ isAdmin, isLoggedIn, onToggleView }: { isAdmin: boolean; isLoggedIn: boolean; onToggleView: () => void }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);
  const changeView = () => {
    closeMenu();
    onToggleView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".site-header")) closeMenu();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href={isAdmin ? "#panel" : "#inicio"} onClick={closeMenu} aria-label="Tortas Kelita, inicio">
        <img src={withBasePath("/images/logo.jpeg")} alt="" />
        <span>
          <strong>Tortas Kelita</strong>
          <small>La tradición de la abuela</small>
        </span>
      </a>

      <button className="menu-button" type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="site-nav" onClick={toggleMenu}>
        <span />
        <span />
      </button>

      <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label="Navegación principal">
        {isAdmin ? (
          <>
            <a href="#panel" onClick={closeMenu}>Resumen</a>
            {isLoggedIn && <a href="#gestion" onClick={closeMenu}>Agregar</a>}
            {isLoggedIn && <a href="#admin-products" onClick={closeMenu}>Productos</a>}
            {isLoggedIn && <a href="#admin-pedidos" onClick={closeMenu}>Pedidos</a>}
          </>
        ) : (
          <>
            <a href="#historia" onClick={closeMenu}>Historia</a>
            <a href="#catalogo" onClick={closeMenu}>Catálogo</a>
            <a href="#ubicacion" onClick={closeMenu}>Ubicación</a>
            <a className="button button-small" href="#pedido" onClick={closeMenu}>Hacer un pedido</a>
          </>
        )}
        <button className="view-switch" type="button" onClick={changeView}>
          {isAdmin ? "Vista cliente" : "Panel administrador"}
        </button>
      </nav>
    </header>
  );
}

type ProductCardProps = {
  product: Product;
  onOpen: (product: Product) => void;
  onQuote?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  isAdmin?: boolean;
};

function ProductCard({ product, onOpen, onQuote, onDelete, onEdit, isAdmin = false }: ProductCardProps) {
  return (
    <article className="product-card">
      <button className="product-image-button" type="button" onClick={() => onOpen(product)}>
        <img src={withBasePath(product.image)} alt={product.name} loading="lazy" decoding="async" width={900} height={675} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <span className="product-category">{product.category}</span>
      </button>
      <div className="product-copy">
        <div className="product-heading">
          <h3>{product.name}</h3>
          <strong>{formatPrice(product)}</strong>
        </div>
        <p>{product.description}</p>
        <div className="stock-row">
          <span className={product.stock === 0 ? "stock-badge is-empty" : "stock-badge"}>
            Stock: {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
          </span>
          <span>{product.portions}</span>
        </div>
        <div className="product-actions">
          <button className="text-button" type="button" onClick={() => onOpen(product)}>Ver detalles</button>
          {isAdmin ? (
            <>
              <button className="text-button" type="button" onClick={() => onEdit?.(product)}>Editar</button>
              <button className="delete-button" type="button" onClick={() => onDelete?.(product)}>Eliminar</button>
            </>
          ) : (
            <button className="button button-quiet" type="button" disabled={product.stock === 0} onClick={() => onQuote?.(product)}>
              {product.stock === 0 ? "Agotado" : "Cotizar"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

type ProductModalProps = {
  product: Product;
  onClose: () => void;
  onQuote: (product: Product) => void;
  isAdmin: boolean;
};

function ProductModal({ product, onClose, onQuote, isAdmin }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar detalles">&times;</button>
        <img className="modal-image" src={withBasePath(product.image)} alt={product.name} loading="eager" decoding="async" width={1200} height={900} />
        <div className="modal-copy">
          <span className="eyebrow">{product.category}</span>
          <div className="modal-heading">
            <h2 id="modal-title">{product.name}</h2>
            <strong>{formatPrice(product)}</strong>
          </div>
          <p>{product.description}</p>
          <dl className="product-facts">
            <div><dt>Stock</dt><dd>{product.stock} {product.stock === 1 ? "unidad" : "unidades"}</dd></div>
            <div><dt>Rendimiento</dt><dd>{product.portions}</dd></div>
            <div><dt>Ideal para</dt><dd>{product.occasions.join(" / ")}</dd></div>
          </dl>
          <button className="button button-wide" type="button" disabled={!isAdmin && product.stock === 0} onClick={() => isAdmin ? onClose() : onQuote(product)}>
            {isAdmin ? "Volver a la administración" : product.stock === 0 ? "Producto agotado" : "Cotizar este producto"}
          </button>
        </div>
      </section>
    </div>
  );
}

type CatalogManagerProps = {
  productCount: number;
  editingProduct: Product | null;
  onSaveProduct: (product: Product, editId?: number) => Promise<boolean>;
  onCancelEdit: () => void;
};

function CatalogManager({ productCount, editingProduct, onSaveProduct, onCancelEdit }: CatalogManagerProps) {
  const [form, setForm] = useState(emptyProductForm);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const isEditing = Boolean(editingProduct);

  useEffect(() => {
    if (!editingProduct) {
      setForm(emptyProductForm);
      setImagePreview("");
      setImageName("");
      setImageError("");
      setFormMessage("");
      return;
    }

    setForm({
      name: editingProduct.name,
      description: editingProduct.description,
      price: String(editingProduct.price),
      category: editingProduct.category,
      stock: String(editingProduct.stock),
      portions: editingProduct.portions,
      occasions: editingProduct.occasions.join(", "),
    });
    setImagePreview(editingProduct.image);
    setImageName("Imagen actual del catálogo");
    setFormMessage("Editando producto seleccionado.");
  }, [editingProduct]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value } as ProductFormState));
    setFormMessage("");
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageError("");
    setFormMessage("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("El archivo seleccionado debe ser una imagen.");
      setImagePreview("");
      setImageName("");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("La imagen supera el tamaño permitido de 2 MB.");
      setImagePreview("");
      setImageName("");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setImageName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim() || !form.description.trim()) {
      setFormMessage("El nombre y la descripción son obligatorios.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setFormMessage("El precio debe ser mayor que 0.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setFormMessage("El stock debe ser un número entero mayor o igual a 0.");
      return;
    }

    const occasions = form.occasions.split(",").map((occasion) => occasion.trim()).filter(Boolean);
    const productToSave: Product = {
      id: editingProduct?.id || Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      category: form.category,
      stock,
      image: imagePreview || "/images/birthday-pink.jpeg",
      portions: form.portions.trim() || "Por definir",
      occasions: occasions.length > 0 ? occasions : ["Pedido especial"],
    };

    const saved = await onSaveProduct(productToSave, editingProduct?.id);
    if (!saved) {
      setFormMessage("No se pudo guardar. Verifica que el backend esté activo y que hayas iniciado sesión.");
      return;
    }

    setForm(emptyProductForm);
    setImagePreview("");
    setImageName("");
    setImageError("");
    setFormMessage(isEditing ? "Producto actualizado correctamente." : "Producto agregado correctamente.");
    setFileInputKey((current) => current + 1);
  };

  return (
    <section id="gestion" className="section manager-section">
      <div className="manager-heading">
        <div>
          <span className="eyebrow">Gestión del catálogo</span>
          <h2>{isEditing ? "Actualiza el producto." : "Agrega un nuevo producto."}</h2>
          <p>Los cambios se guardan en MongoDB y se reflejan en el catálogo público.</p>
        </div>
        <div className="product-counter" aria-live="polite"><span>Productos registrados</span><strong>{productCount}</strong></div>
      </div>

      <form className="manager-form" onSubmit={handleSubmit}>
        <div className="manager-fields">
          <div className="form-field"><label htmlFor="product-name">Nombre del producto</label><input id="product-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Ej: Torta de chocolate" /></div>
          <div className="form-field"><label htmlFor="product-category">Categoría</label><select id="product-category" name="category" value={form.category} onChange={handleChange} required><option value="Tortas">Tortas</option><option value="Regalos">Regalos</option><option value="Eventos">Eventos</option></select></div>
          <div className="form-field form-field-wide"><label htmlFor="product-description">Descripción</label><textarea id="product-description" name="description" rows={4} value={form.description} onChange={handleChange} required placeholder="Describe el producto, sus ingredientes y terminación" /></div>
          <div className="form-field"><label htmlFor="product-price">Precio</label><input id="product-price" name="price" type="number" min="1" step="1" value={form.price} onChange={handleChange} required placeholder="15000" /></div>
          <div className="form-field"><label htmlFor="product-stock">Stock</label><input id="product-stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required placeholder="10" /></div>
          <div className="form-field"><label htmlFor="product-portions">Porciones o formato</label><input id="product-portions" name="portions" type="text" value={form.portions} onChange={handleChange} placeholder="Ej: 15 personas" /></div>
          <div className="form-field"><label htmlFor="product-occasions">Ocasiones</label><input id="product-occasions" name="occasions" type="text" value={form.occasions} onChange={handleChange} placeholder="Cumpleaños, aniversario" /></div>
        </div>

        <div className="image-field">
          <label htmlFor="product-image">Imagen del producto</label>
          <label className={imagePreview ? "image-dropzone has-image" : "image-dropzone"} htmlFor="product-image">
            {imagePreview ? <img src={withBasePath(imagePreview)} alt="Vista previa del producto" /> : <span><strong>Seleccionar imagen</strong><small>JPG, PNG o WEBP hasta 2 MB</small></span>}
          </label>
          <input key={fileInputKey} className="file-input" id="product-image" type="file" accept="image/*" onChange={handleImageChange} />
          {imageName && <span className="file-name">{imageName}</span>}
          {imageError && <p className="field-error" role="alert">{imageError}</p>}
          <button className="button button-wide manager-submit" type="submit">{isEditing ? "Actualizar producto" : "Agregar producto"}</button>
          {isEditing && <button className="view-switch button-wide cancel-edit-button" type="button" onClick={onCancelEdit}>Cancelar edición</button>}
          {formMessage && <p className={formMessage.includes("correctamente") || formMessage.includes("Editando") ? "form-status is-success" : "form-status"} role="status">{formMessage}</p>}
        </div>
      </form>
    </section>
  );
}

function OrderForm({ selectedProduct, products }: { selectedProduct: string; products: Product[] }) {
  const [form, setForm] = useState(emptyOrderForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setForm((current) => ({ ...current, product: selectedProduct }));
  }, [selectedProduct]);

  useEffect(() => {
    const customOptions = ["Torta personalizada", "Otro pedido"];
    const productStillExists = products.some((product) => product.name === form.product);
    const isCustomOption = customOptions.includes(form.product);
    if (form.product && !productStillExists && !isCustomOption) setForm((current) => ({ ...current, product: "" }));
  }, [products, form.product]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value } as OrderFormState));
    setStatus("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hola, Tortas Kelita. Quiero solicitar una cotización:",
      "",
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      `Producto: ${form.product}`,
      `Evento: ${form.event}`,
      `Porciones o cantidad: ${form.quantity}`,
      `Fecha deseada: ${form.date}`,
      `Detalles: ${form.details || "Sin observaciones"}`,
    ].join("\n");

    try {
      await fetch(`${API_URL}/pedidos/web`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("Pedido guardado en la base de datos y listo para WhatsApp.");
    } catch (_error) {
      setStatus("No se pudo guardar en MongoDB, pero puedes continuar por WhatsApp.");
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-field"><label htmlFor="name">Nombre</label><input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre completo" /></div>
      <div className="form-field"><label htmlFor="phone">WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={handleChange} placeholder="+56 9 1234 5678" /></div>
      <div className="form-field"><label htmlFor="event">Tipo de evento</label><select id="event" name="event" required value={form.event} onChange={handleChange}><option value="" disabled>Selecciona una opción</option><option>Cumpleaños</option><option>Matrimonio</option><option>Aniversario</option><option>Evento corporativo</option><option>Otro</option></select></div>
      <div className="form-field"><label htmlFor="product">Producto</label><select id="product" name="product" required value={form.product} onChange={handleChange}><option value="" disabled>Selecciona un producto</option>{products.map((product) => <option key={product.id}>{product.name}</option>)}<option>Torta personalizada</option><option>Otro pedido</option></select></div>
      <div className="form-field"><label htmlFor="quantity">Porciones o cantidad</label><input id="quantity" name="quantity" type="number" min="1" required value={form.quantity} onChange={handleChange} placeholder="Ej: 20" /></div>
      <div className="form-field"><label htmlFor="date">Fecha deseada</label><input id="date" name="date" type="date" min={new Date().toISOString().slice(0, 10)} required value={form.date} onChange={handleChange} /></div>
      <div className="form-field form-field-wide"><label htmlFor="details">Detalles del pedido</label><textarea id="details" name="details" rows={4} value={form.details} onChange={handleChange} placeholder="Sabor, colores, mensaje, alergias o una idea especial" /></div>
      <button className="button button-wide form-submit" type="submit">Continuar en WhatsApp</button>
      <p className="form-note">Se abrirá WhatsApp de Tortas Kelita con los datos listos para enviar.</p>
      {status && <p className="form-status is-success" role="status">{status}</p>}
    </form>
  );
}

function AdminLogin({ onLogin }: { onLogin: (usuario: string, password: string) => Promise<boolean> }) {
  const [usuario, setUsuario] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = await onLogin(usuario, password);
    setMessage(ok ? "Sesión iniciada correctamente." : "No se pudo iniciar sesión. Verifica backend, MongoDB o credenciales.");
  };

  return (
    <main className="admin-dashboard admin-login-page">
      <section id="panel" className="section manager-section admin-login-card">
        <div className="manager-heading">
          <div>
            <span className="eyebrow">Acceso administrador</span>
            <h1>Panel de Tortas Kelita.</h1>
            <p>Inicia sesión para administrar productos, pedidos, clientes y boletas conectadas a MongoDB.</p>
          </div>
          <div className="product-counter"><span>BD</span><strong>MongoDB</strong></div>
        </div>
        <form className="order-form admin-login-form" onSubmit={handleSubmit}>
          <div className="form-field"><label htmlFor="admin-user">Usuario</label><input id="admin-user" value={usuario} onChange={(event) => setUsuario(event.target.value)} required /></div>
          <div className="form-field"><label htmlFor="admin-pass">Contraseña</label><input id="admin-pass" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          <button className="button button-wide" type="submit">Entrar al panel</button>
          <p className="form-note">Credenciales de prueba: admin / admin123</p>
          {message && <p className={message.includes("correctamente") ? "form-status is-success" : "form-status"}>{message}</p>}
        </form>
      </section>
    </main>
  );
}

type AdminDashboardProps = {
  products: Product[];
  visibleProducts: Product[];
  category: Category;
  adminUser: AdminUser | null;
  pedidos: Pedido[];
  clientes: Cliente[];
  boletas: Boleta[];
  resumen: DashboardResumen | null;
  adminMessage: string;
  editingProduct: Product | null;
  onCategoryChange: (category: Category) => void;
  onSaveProduct: (product: Product, editId?: number) => Promise<boolean>;
  onOpenProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onCancelEdit: () => void;
  onLogout: () => void;
  onRefresh: () => void;
};

function AdminDashboard({ products, visibleProducts, category, adminUser, pedidos, clientes, boletas, resumen, adminMessage, editingProduct, onCategoryChange, onSaveProduct, onOpenProduct, onDeleteProduct, onEditProduct, onCancelEdit, onLogout, onRefresh }: AdminDashboardProps) {
  const totalStock = resumen?.totalStock ?? products.reduce((total, product) => total + product.stock, 0);
  const lowStock = resumen?.stockBajo ?? products.filter((product) => product.stock <= 3).length;
  const activeCategories = new Set(products.map((product) => product.category)).size;

  return (
    <main className="admin-dashboard">
      <section id="panel" className="section admin-overview">
        <div className="admin-title-row">
          <div>
            <span className="eyebrow">Vista administrador</span>
            <h1>Panel del catálogo.</h1>
            <p>Controla productos, pedidos, clientes y boletas desde MongoDB sin cambiar el diseño original.</p>
          </div>
          <div className="admin-actions-inline">
            <span className="admin-session"><i /> {adminUser?.nombre || "Administración activa"}</span>
            <button className="view-switch" type="button" onClick={onRefresh}>Actualizar datos</button>
            <button className="delete-button" type="button" onClick={onLogout}>Cerrar sesión</button>
          </div>
        </div>
        <div className="admin-stats">
          <article><span>Productos</span><strong>{products.length}</strong><small>registrados</small></article>
          <article><span>Stock total</span><strong>{totalStock}</strong><small>unidades disponibles</small></article>
          <article><span>Pedidos</span><strong>{resumen?.pedidos ?? pedidos.length}</strong><small>{resumen?.pedidosPendientes ?? pedidos.filter((pedido) => pedido.estado === "Pendiente").length} pendientes</small></article>
          <article><span>Ventas</span><strong>{formatMoney(resumen?.ventas ?? boletas.reduce((total, boleta) => total + boleta.total, 0))}</strong><small>{boletas.length} boletas</small></article>
        </div>
        <div className="admin-stats admin-stats-secondary">
          <article><span>Clientes</span><strong>{resumen?.clientes ?? clientes.length}</strong><small>registrados</small></article>
          <article><span>Stock bajo</span><strong>{lowStock}</strong><small>productos con 3 o menos</small></article>
          <article><span>Categorías</span><strong>{activeCategories}</strong><small>categorías activas</small></article>
          <article><span>Base de datos</span><strong>MongoDB</strong><small>pasteleria_kelita</small></article>
        </div>
        {adminMessage && <p className={adminMessage.includes("correctamente") || adminMessage.includes("conectado") ? "form-status is-success" : "form-status"}>{adminMessage}</p>}
      </section>

      <CatalogManager productCount={products.length} editingProduct={editingProduct} onSaveProduct={onSaveProduct} onCancelEdit={onCancelEdit} />

      <section id="admin-products" className="section catalog-section admin-catalog-section">
        <div className="section-heading catalog-heading">
          <div><span className="eyebrow">Inventario</span><h2>Productos publicados.</h2><p className="catalog-count">Productos registrados: <strong>{products.length}</strong></p></div>
          <div className="filters" aria-label="Filtrar inventario">
            {categories.map((item) => <button key={item} className={category === item ? "filter is-active" : "filter"} type="button" aria-pressed={category === item} onClick={() => onCategoryChange(item)}>{item}</button>)}
          </div>
        </div>
        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpenProduct} onDelete={onDeleteProduct} onEdit={onEditProduct} isAdmin />)}
          </div>
        ) : (
          <div className="empty-catalog"><strong>No hay productos en esta categoría.</strong><span>Agrega uno nuevo desde el formulario superior.</span></div>
        )}
      </section>

      <section id="admin-pedidos" className="section admin-data-section">
        <div className="section-heading"><div><span className="eyebrow">Pedidos</span><h2>Solicitudes recibidas desde la web.</h2></div></div>
        <div className="admin-table-wrap">
          <table className="admin-table"><thead><tr><th>Cliente</th><th>Producto</th><th>Fecha</th><th>Estado</th><th>Total estimado</th></tr></thead><tbody>
            {pedidos.length === 0 ? <tr><td colSpan={5}>Aún no hay pedidos registrados.</td></tr> : pedidos.map((pedido) => <tr key={pedido.id}><td><strong>{pedido.nombreCliente}</strong><span>{pedido.telefono}</span></td><td>{pedido.productoNombre}<span>{pedido.cantidad} unidad(es)</span></td><td>{pedido.fechaDeseada}</td><td><span className="stock-badge">{pedido.estado}</span></td><td>{formatMoney(pedido.totalEstimado)}</td></tr>)}
          </tbody></table>
        </div>
      </section>

      <section id="admin-clientes" className="section admin-data-section">
        <div className="section-heading"><div><span className="eyebrow">Clientes</span><h2>Contactos guardados.</h2></div></div>
        <div className="admin-table-wrap">
          <table className="admin-table"><thead><tr><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Origen</th></tr></thead><tbody>
            {clientes.length === 0 ? <tr><td colSpan={4}>Aún no hay clientes registrados.</td></tr> : clientes.map((cliente) => <tr key={cliente.id}><td>{cliente.nombre}</td><td>{cliente.telefono}</td><td>{cliente.email || "-"}</td><td>{cliente.origen || "web"}</td></tr>)}
          </tbody></table>
        </div>
      </section>

      <section id="admin-boletas" className="section admin-data-section">
        <div className="section-heading"><div><span className="eyebrow">Boletas</span><h2>Documentos emitidos.</h2></div></div>
        <div className="admin-table-wrap">
          <table className="admin-table"><thead><tr><th>Número</th><th>Cliente</th><th>Subtotal</th><th>IVA</th><th>Total</th><th>Estado</th></tr></thead><tbody>
            {boletas.length === 0 ? <tr><td colSpan={6}>Aún no hay boletas registradas.</td></tr> : boletas.map((boleta) => <tr key={boleta.id}><td>{boleta.numero}</td><td>{boleta.clienteNombre}</td><td>{formatMoney(boleta.subtotal)}</td><td>{formatMoney(boleta.iva)}</td><td><strong>{formatMoney(boleta.total)}</strong></td><td>{boleta.estado}</td></tr>)}
          </tbody></table>
        </div>
      </section>
    </main>
  );
}

function SocialFloating() {
  const whatsappText = encodeURIComponent("Hola, Tortas Kelita. Quiero hacer una consulta.");
  return (
    <div className="social-floating" aria-label="Redes sociales de Tortas Kelita">
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer">WA</a>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">IG</a>
    </div>
  );
}

export function KelitaSite() {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<Category>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteProduct, setQuoteProduct] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [boletas, setBoletas] = useState<Boleta[]>([]);
  const [resumen, setResumen] = useState<DashboardResumen | null>(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => category === "Todos" ? catalogProducts : catalogProducts.filter((product) => product.category === category), [catalogProducts, category]);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      if (!response.ok) throw new Error("No se pudo cargar el catálogo.");
      const data = await response.json() as Product[];
      setCatalogProducts(data);
      setAdminMessage("Catálogo conectado correctamente a MongoDB.");
    } catch (_error) {
      setAdminMessage("Backend sin conexión: se muestra el catálogo local de respaldo.");
    }
  };

  const authFetch = async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    if (!response.ok) throw new Error("Solicitud no completada.");
    return response.json() as Promise<T>;
  };

  const loadAdminData = async () => {
    if (!token) return;
    try {
      const [pedidosData, clientesData, boletasData, resumenData] = await Promise.all([
        authFetch<Pedido[]>("/pedidos"),
        authFetch<Cliente[]>("/clientes"),
        authFetch<Boleta[]>("/boletas"),
        authFetch<DashboardResumen>("/dashboard/resumen"),
      ]);
      setPedidos(pedidosData);
      setClientes(clientesData);
      setBoletas(boletasData);
      setResumen(resumenData);
      setAdminMessage("Panel actualizado correctamente desde MongoDB.");
    } catch (_error) {
      setAdminMessage("No se pudieron cargar datos del panel. Revisa backend, MongoDB o token.");
    }
  };

  useEffect(() => {
    void loadProducts();
    const savedToken = window.localStorage.getItem("kelita_admin_token") || "";
    const savedAdmin = window.localStorage.getItem("kelita_admin_user");
    if (savedToken) setToken(savedToken);
    if (savedAdmin) setAdminUser(JSON.parse(savedAdmin) as AdminUser);
  }, []);

  useEffect(() => {
    if (token) void loadAdminData();
  }, [token]);

  const requestQuote = (product: Product) => {
    setQuoteProduct(product.name);
    window.setTimeout(() => document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const handleLogin = async (usuario: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      if (!response.ok) throw new Error("Credenciales inválidas.");
      const data = await response.json() as { token: string; admin: AdminUser };
      setToken(data.token);
      setAdminUser(data.admin);
      window.localStorage.setItem("kelita_admin_token", data.token);
      window.localStorage.setItem("kelita_admin_user", JSON.stringify(data.admin));
      setAdminMessage("Sesión iniciada correctamente.");
      return true;
    } catch (_error) {
      setAdminMessage("No se pudo iniciar sesión. Verifica MongoDB y el backend.");
      return false;
    }
  };

  const handleLogout = () => {
    setToken("");
    setAdminUser(null);
    setEditingProduct(null);
    window.localStorage.removeItem("kelita_admin_token");
    window.localStorage.removeItem("kelita_admin_user");
    setAdminMessage("Sesión cerrada.");
  };

  const saveProduct = async (product: Product, editId?: number) => {
    if (!token) return false;
    try {
      const method = editId ? "PUT" : "POST";
      const path = editId ? `/productos/${editId}` : "/productos";
      const savedProduct = await authFetch<Product>(path, { method, body: JSON.stringify(product) });
      setCatalogProducts((current) => editId ? current.map((item) => item.id === editId ? savedProduct : item) : [savedProduct, ...current]);
      setCategory("Todos");
      setEditingProduct(null);
      setAdminMessage(editId ? "Producto actualizado correctamente en MongoDB." : "Producto creado correctamente en MongoDB.");
      window.setTimeout(() => document.getElementById("admin-products")?.scrollIntoView({ behavior: "smooth" }), 100);
      void loadAdminData();
      return true;
    } catch (_error) {
      setAdminMessage("No se pudo guardar el producto. Revisa la conexión al backend.");
      return false;
    }
  };

  const deleteProduct = async (product: Product) => {
    const confirmed = window.confirm(`¿Deseas eliminar "${product.name}" del catálogo?`);
    if (!confirmed) return;

    if (!token) {
      setAdminMessage("Debes iniciar sesión para eliminar productos.");
      return;
    }

    try {
      await authFetch(`/productos/${product.id}`, { method: "DELETE" });
      const remainingProducts = catalogProducts.filter((item) => item.id !== product.id);
      setCatalogProducts(remainingProducts);
      if (category !== "Todos" && !remainingProducts.some((item) => item.category === category)) setCategory("Todos");
      if (selectedProduct?.id === product.id) setSelectedProduct(null);
      if (quoteProduct === product.name) setQuoteProduct("");
      setAdminMessage("Producto eliminado correctamente de MongoDB.");
      void loadAdminData();
    } catch (_error) {
      setAdminMessage("No se pudo eliminar el producto. Revisa backend o token.");
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    window.setTimeout(() => document.getElementById("gestion")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const toggleView = () => {
    setIsAdmin((current) => !current);
    setSelectedProduct(null);
    setCategory("Todos");
  };

  return (
    <>
      <Header isAdmin={isAdmin} isLoggedIn={Boolean(token)} onToggleView={toggleView} />
      {isAdmin ? (
        token ? (
          <AdminDashboard
            products={catalogProducts}
            visibleProducts={visibleProducts}
            category={category}
            adminUser={adminUser}
            pedidos={pedidos}
            clientes={clientes}
            boletas={boletas}
            resumen={resumen}
            adminMessage={adminMessage}
            editingProduct={editingProduct}
            onCategoryChange={setCategory}
            onSaveProduct={saveProduct}
            onOpenProduct={setSelectedProduct}
            onDeleteProduct={deleteProduct}
            onEditProduct={editProduct}
            onCancelEdit={() => setEditingProduct(null)}
            onLogout={handleLogout}
            onRefresh={() => { void loadProducts(); void loadAdminData(); }}
          />
        ) : <AdminLogin onLogin={handleLogin} />
      ) : (
        <>
          <main>
            <section id="inicio" className="hero" style={{ backgroundImage: `url("${heroBackgroundImage}")` }}>
              <div className="hero-overlay" />
              <div className="hero-content">
                <span className="eyebrow eyebrow-light">Repostería artesanal &middot; Villa Alemana</span>
                <h1>Recetas de familia para celebrar lo importante.</h1>
                <p>Tortas, alfajores y detalles hechos a mano, con ingredientes frescos y terminaciones personalizadas.</p>
                <div className="hero-actions"><a className="button" href="#catalogo">Ver catálogo</a><a className="button button-glass" href="#pedido">Pedir cotización</a></div>
              </div>
              <div className="hero-note"><span>Pedidos personalizados</span><strong>Para cada ocasión</strong></div>
            </section>

            <section id="historia" className="section story-section">
              <div className="section-heading story-heading"><div><span className="eyebrow">Nuestra historia</span><h2>El sabor casero sigue siendo el centro.</h2></div><p>Elaboramos cada pedido de forma artesanal, con ingredientes frescos y atención en cada detalle, para acompañar tus momentos especiales con el sabor de casa.</p></div>
              <div className="story-grid"><img src={withBasePath("/images/sublogo.png")} alt="Tortas Kelita preparando una receta artesanal" loading="lazy" /><div className="values-list"><article><span>01</span><div><h3>Hecho a mano</h3><p>Producción artesanal para cuidar textura, frescura y terminación.</p></div></article><article><span>02</span><div><h3>A tu medida</h3><p>Adaptamos sabores, colores y formato al momento que quieres celebrar.</p></div></article><article><span>03</span><div><h3>Ingredientes frescos</h3><p>Seleccionamos cada ingrediente pensando primero en el sabor.</p></div></article></div></div>
            </section>

            <section id="catalogo" className="section catalog-section">
              <div className="section-heading catalog-heading"><div><span className="eyebrow">Catálogo</span><h2>Encuentra algo para compartir.</h2><p className="catalog-count">Productos disponibles: <strong>{catalogProducts.length}</strong></p></div><div className="filters" aria-label="Filtrar catálogo">{categories.map((item) => <button key={item} className={category === item ? "filter is-active" : "filter"} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
              {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} onQuote={requestQuote} />)}</div> : <div className="empty-catalog"><strong>No hay productos en esta categoría.</strong><span>Vuelve a revisar pronto.</span></div>}
            </section>

            <section id="pedido" className="section order-section">
              <div className="order-intro"><span className="eyebrow">Tu próxima celebración</span><h2>Cuéntanos qué tienes en mente.</h2><p>Completa los datos esenciales. Recibirás una cotización y coordinaremos juntos los detalles.</p><div className="order-contact"><strong>WhatsApp</strong><span>+56 9 6373 2988</span></div></div>
              <OrderForm selectedProduct={quoteProduct} products={catalogProducts} />
            </section>

            <section id="resenas" className="section reviews-section">
              <div className="section-heading"><div><span className="eyebrow">Comentarios</span><h2>Momentos que ya endulzamos.</h2></div></div>
              <div className="reviews-grid">{reviews.map((review) => <article className="review-card" key={review.name}><div className="stars" aria-label={`${review.stars} de 5 estrellas`}>{Array.from({ length: review.stars }, (_, index) => <span aria-hidden="true" key={index}>&#9733;</span>)}</div><blockquote>&ldquo;{review.text}&rdquo;</blockquote><footer><strong>{review.name}</strong><span>{review.date}</span></footer></article>)}</div>
            </section>

            <section id="ubicacion" className="section location-section">
              <div className="location-copy"><span className="eyebrow">Ubicación</span><h2>Encuéntranos en Villa Alemana.</h2><p>Revisa el punto de referencia en el mapa y coordina previamente el retiro o la entrega de tu pedido por WhatsApp.</p><dl className="location-details"><div><dt>Comuna</dt><dd>Villa Alemana</dd></div><div><dt>Región</dt><dd>Valparaíso, Chile</dd></div><div><dt>Atención</dt><dd>Lunes a viernes, 09:00 a 19:00</dd></div></dl></div>
              <div className="map-frame"><iframe title="Ubicación de Tortas Kelita en Villa Alemana" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d497.1336732029104!2d-71.38624158194376!3d-33.048478622361166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl!4v1778112400299!5m2!1ses-419!2scl" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div>
            </section>
          </main>

          <footer className="site-footer">
            <div className="footer-brand"><img src={withBasePath("/images/logo.jpeg")} alt="Logo de Tortas Kelita" /><div><strong>Tortas Kelita</strong><span>La tradición de la abuela</span></div></div>
            <div className="footer-links"><a href="#catalogo">Catálogo</a><a href="#ubicacion">Ubicación</a><a href="#pedido">Pedidos</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a></div>
            <p>&copy; 2026 Tortas Kelita. Sitio desarrollado por Alejandro Echeverría y Brallan Reyes.</p>
          </footer>
          <SocialFloating />
        </>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onQuote={requestQuote} isAdmin={isAdmin} />}
    </>
  );
}
