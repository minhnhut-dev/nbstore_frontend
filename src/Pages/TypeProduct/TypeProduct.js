import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import "./TypeProduct.css";
import { Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import Paginate from "../../Component/Pagination/Paginate";
import {getTypeProductById, getProductbyProductCatalogueId} from "../../apis/products";
import {linkImage} from "../../constants/index";
export default function TypeProduct() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState("");
  const [page,setPage] = useState(1);
  const [total, setTotal] = useState("");
  const handleChangePage= (page)=>{
    setPage(page);
  }

  useEffect(() => {
    getProductbyProductCatalogueId({id: id, page: page})
      .then((res) => {
        setProduct(res.data.data);
        setTotal(res.last_page);
      });
  }, [page]);

  const handleSort = () => {
    if (sort == 1) {
      const sortIncrease = [...product].sort((a, b) => {
        return a.GiaKM - b.GiaKM;
      });
      setProduct(sortIncrease);
    } else if (sort == 2) {
      const sortDecrease = [...product].sort((a, b) => {
        return b.GiaKM - a.GiaKM;
      });
      setProduct(sortDecrease);
    }
    else
    {
      return;
    }
  };
  return (
    <>
      <Header />
      <div className="noindex">
        <section className="light_section">
          <div id="collection" className="container">
            <div className="col-sm-12">
              <h1 className="title-box-collection" style={{ fontSize: "36px" }}>
                {product[0]?.name}
              </h1>
              <div className="row">
                <div className="main-content">
                  <div id="breadcrumb">
                    <div className="main">
                      <div className="breadcrumbs container">
                        <span className="showHere">B???n ??ang ???</span>
                        <Link to="/" className="pathway">
                          Trang ch???
                        </Link>
                        <span>
                          <i className="fa fa-caret-right"></i>
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-sm-12 wrap-sort-by">
                        <div className="browse-tags pull-right">
                          <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>T??y ch???n</Form.Label>
                              <Form.Control
                                as="select"
                                onChange={(e) => setSort(e.target.value)}
                                onClick={handleSort}
                              >
                                <option value="">T??y ch???n</option>
                                <option value="1">Gi?? t??? th???p ?????n cao</option>
                                <option value="2">Gi?? t??? cao ?????n th???p</option>
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 product-list">
                    <div className="row content-product-list">
                      {product.map((item, index) => (
                        <div
                          className="col-sm-4 col-xs-12 padding-none col-fix20"
                          key={index}
                        >
                          <div className="product-row">
                            <div className="product-row-img">
                              <Link to={`/ProductDetail/${item.id}`}>
                                <img
                                  src={linkImage + item.AnhDaiDien}
                                  alt={item.AnhDaiDien}
                                  className="product-row-thumbnail"
                                />
                              </Link>
                              <div className="product-row-price-hover">
                                <Link to={`/ProductDetail/${item.id}`}>
                                  <div className="product-row-note pull-left">
                                    Xem chi ti???t
                                  </div>
                                </Link>
                                <Link
                                  to={`/ProductDetail/${item.id}`}
                                  className="product-row-btnbuy pull-right"
                                >
                                  ?????t h??ng
                                </Link>
                              </div>
                            </div>

                            <h2 className="product-row-name">
                              {item.TenSanPham}
                            </h2>
                            <div className="product-row-info">
                              <div className="product-row-price pull-left">
                                <NumberFormat
                                value={item.GiaCu}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VN??"}
                                renderText={(value, props) => (
                                  <del {...props}>{value}</del>
                                )}
                              />
                                <br />
                                
                                 <NumberFormat
                                value={item.GiaKM}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VN??"}
                                renderText={(value, props) => (
                                  <span className="product-row-sale" {...props}>{value}</span>
                                )}
                              />
                              </div>
                              <div className="new-product-percent">{item.SoLuong ==0 ? "H???t h??ng" :"C??n h??ng"}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                         
                    </div>
                      {product.length >=10  ? <Paginate handleChangePage={handleChangePage} total={total}/>:""}              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
