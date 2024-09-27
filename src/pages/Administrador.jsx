import React, { useContext, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles/administrador.css";
import HeaderContent from "../components/HeaderContent";
import Sidebar from "../components/Sidebar";

import { useNavigate, useLocation } from "react-router-dom";
import { InventarioContext } from "../context/InventarioContext";
import MenuProceso from "../components/proceso/MenuProceso";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import Inventario from "../components/proceso/Inventario";
import Consultas from "../components/proceso/Consultas";
import Reportes from "../components/proceso/Reportes";
import ConsultaSiga from "../components/consultas/ConsultaSiga";
import MenuInventario from "../components/proceso/MenuInventario";
import EtiquetasUbicaciones from "../components/proceso/EtiquetasUbicaciones";
import EtiquetasBienes from "../components/proceso/EtiquetasBienes";
import TarjetasCargo from "../components/proceso/TarjetasCargo";

const { Sider, Header, Content } = Layout;

const Administrador = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const [title, setTitle] = useState("Proceso");
  const { setIsLogged, isLogged } = useContext(InventarioContext);

  return (
    <Layout>
      {/* {!isLogged && !localStorage.getItem("token") ? (
        <Login setIsLogged={setIsLogged} />
      ) : ( */}
      <>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          {" "}
          <Sidebar />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="triger-btn"
          />
        </Sider>

        <Layout style={{ background: "#F6F7F9" }}>
          <Header className="header">
            <HeaderContent title={title} />
          </Header>
          <Content className="content">
            <Routes>
              <Route
                path="/proceso"
                element={
                  <ProtectedRoute>
                    <MenuProceso setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/proceso/inventario/menu"
                element={
                  <ProtectedRoute>
                    <MenuInventario setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/proceso/inventario/registro"
                element={
                  <ProtectedRoute>
                    <Inventario setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/inventario/consultas"
                element={
                  <ProtectedRoute>
                    <Consultas setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/inventario/cargo"
                element={
                  <ProtectedRoute>
                    <Inventario setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/inventario/bienes"
                element={
                  <ProtectedRoute>
                    <Inventario setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/inventario/ubicaciones"
                element={
                  <ProtectedRoute>
                    <Inventario setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/proceso/inventario/etiquetas"
                element={
                  <ProtectedRoute>
                    <EtiquetasUbicaciones setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/inventario/etiquetas/bienes"
                element={
                  <ProtectedRoute>
                    <EtiquetasBienes setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
                            <Route
                path="/proceso/inventario/cargos"
                element={
                  <ProtectedRoute>
                    <TarjetasCargo setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proceso/consultas"
                element={
                  <ProtectedRoute>
                    <Consultas setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/consulta"
                element={
                  <ProtectedRoute>
                    <ConsultaSiga setTitle={setTitle} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </>
      {/* )} */}
    </Layout>
  );
};

export default Administrador;
