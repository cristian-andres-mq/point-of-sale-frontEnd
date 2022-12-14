import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  // useSate hook
  const [collapsed, setCollapsed] = useState(false);

  // To get localStorage Data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      {/* Esta zona es la sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Esta parte 👇 se puede modificar o ubicar el logo. 🐺 */}
        <div className="logo">
          <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>
        </div>
        <Menu
          // Podemos elegir entre un tema oscuro 🌙 o el tema claro 🌞 o modificarlo con CSS.
          theme="dark"
          mode="inline"
          // La  propiedad window.locate.pathname nos ayuda en la selección del contenido a mostrar.
          defaultSelectedKeys={window.location.pathname}
        >
          {/* Cada uno de los siguientes ítems 📦 muestra un lugar 🎯 en la navegación, solo copiando y pegando se puede reutilizar fácilmente 😀.  */}
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Facturación</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Productos</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* En este lugar tenemos el botón para desplegar la 💁‍♂️ sidebar, en esta parte podemos crear también algún tipo de menú 📝 para la navegación 🚢 o poner algún mensaje, también es un buen lugar para ubicar publicidad 📣 si se requiere.   */}
        <Header className="site-layout-background">
          {React.createElement(
            // Sí es falso mostrara el icono de salida, por el contrario si es verdadero mostrara el icono de colapsar.
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div
            className="cart-item d-flex jusitfy-content-space-between flex-row"
            onClick={() => navigate("/cart")}
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        {/* Esta es la zona de contenido  👇*/}
        <Content
          className="site-layout-background"
          style={{
            margin: "10px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Al traer las props como children 👨‍👧‍👧, todo lo que el default layout sea su padre  será renderizado en la zona de contenido. */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
