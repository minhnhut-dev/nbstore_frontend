import React, { useEffect, useRef } from "react";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import { Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageUploading from "react-images-uploading";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useForm } from "react-hook-form";
import {register_account} from "../../apis/account";
function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [sex, setSex] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [errorEmail, setErrorEmail] = useState([]);
  const [errorUsername, setErrorUsername] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [images, setImages] = React.useState([]);
  const [imageUser, setImageUser] = useState();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    re_password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const {register, handleSubmit,  formState: { errors }, watch } = useForm({});
  const Password = useRef({});
  Password.current=watch("password", "");
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);

    if (imageList[0] !== undefined) {
      setImageUser(imageList[0].data_url);
    } else {
      return;
    }
  };
  
  const onSubmit = (data) => {
    const data_user = {
      Email: data.Email,
      username: data.username,
      password: data.password,
      TenNguoidung: data.name,
      SDT: phone,
      DiaChi: data.address,
      GioiTinh: data.gender,
      Anh: imageUser,
    };
    setOpen(true);
    register_account(data_user)
      .then(() => {
        setTimeout(() => {
          enqueueSnackbar("Ch??c m???ng b???n ????ng k?? th??nh c??ng !", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setRedirect(true);
        }, 4000);
      })
      .catch((e) => {
        setOpen(false);
        console.log(e.response);
        setErrorEmail(e.response.data.Email);
        setErrorUsername(e.response.data.username);
        if (e.response.data.Email != undefined) {
          enqueueSnackbar(e.response.data.Email, {
            variant: "error",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        }
        if (e.response.data.username != undefined) {
          enqueueSnackbar(e.response.data.username, {
            variant: "error",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        }

        
      });
  };
   
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowRePassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (redirect) {
    return <Redirect to="/Login" />;
  }
  return (
    <>
      <Header />
      <div className="noindex">
        <div id="layout-page-register" className="container">
          <span className="header-contact header-page clearfix">
            <h5 className="title-register">T???o t??i kho???n</h5>
          </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group username">
              <TextField
                id="outlined-basic-1"
                variant="outlined"
                type="text"
                label="T??n t??i kho???n"
                name="username"
                {...register("username", { required: true,  maxLength: 20, pattern: /^\S*$/
                })}
                />
              {errors?.username?.type ==="required" && <p>T??i kho???n kh??ng ???????c b??? tr???ng</p>}
              {errors?.username?.type === "maxLength" && (
                <p>T??n t??i kho???n kh??ng ???????c qu?? 20 k?? t???</p>)}
              {errors?.username?.type === "pattern" && (
                <p>T??i kho???n ch??? ch???a k?? t??? </p>
              )}
            </div>
          </div>
          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group name">
              <TextField
                id="outlined-basic-2"
                variant="outlined"
                type="text"
                label="H??? t??n"
                name="name"
                {...register("name", { required: true, pattern: /^[a-zA-Z].*[\s\.]*$/g
                })}
              />
              {errors?.name?.type ==="required" && <p>T??n kh??ng ???????c b??? tr???ng</p>}
              {errors?.name?.type === "pattern" && (
                <p>T??n  ch??? ch???a k?? t??? </p>
              )}
            </div>
          </div>

          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group email">
              <TextField
                id="outlined-basic-3"
                variant="outlined"
                type="text"
                label="Email"
                {...register("Email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })}
              />  
              {errors?.Email?.type === "pattern" && (
                <p>Email sai ?????nh d???ng </p>
              )}
                {errors?.Email?.type === "required" && (
                <p>Email kh??ng ???????c b??? tr???ng</p>
              )}

              
            </div>
          </div>

          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group password">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  M???t kh???u
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  // onChange={handleChange("password")}
                  {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="M???t kh???u"
                />
                {errors?.password?.type === "required" && (
                  <p>M???t kh???u kh??ng ???????c b??? tr???ng</p>)}
                {errors?.password?.type === "pattern" && (
                  <p>M???t kh???u c?? 8 k?? t??? v?? 1 k?? t??? hoa</p>)}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                style={{ marginLeft: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Nh???p l???i m???t kh???u
                </InputLabel>
                <OutlinedInput
                 name="re_password"
                  id="outlined-adornment-re_password"
                  type={values.showPassword ? "text" : "password"}
                  {...register("re_password", { validate: value => value === Password.current || "M???t kh???u kh??ng kh???p"
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Nh???p l???i m???t kh???u"
                />
                  {errors.re_password && <p>{errors.re_password .message}</p>}
              </FormControl>
            </div>
          </div>
          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <PhoneInput country={"vn"} placeholder="+84" value={phone} onChange={setPhone} />
          </div>
          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group sex">
              <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-1"
                  label="Gi???i t??nh"
                  name="gender"
                  {...register("gender", { required: true})}
                >
                  <MenuItem value={1}>Nam</MenuItem>
                  <MenuItem value={0}>N???</MenuItem>
                  <MenuItem value={-1}>Kh??c</MenuItem>
                </Select>
              </FormControl>
              {errors?.gender?.type === "required" && (
                  <p>H??y ch???n gi???i t??nh</p>)}
            </div>
          </div>

          {/* <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group city">
              <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel id="demo-simple-select-label">
                  Ch???n t???nh/th??nh ph???
                </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-city"
                    label="T???nh/th??nh ph???"
                  >
                  {city?.map((city,index)=>(

                    <MenuItem value={city.id} key={index}>{city.name}</MenuItem>
                    ))}
                  </Select>
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "25ch" }}
                style={{ marginLeft: "10px" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Ch???n qu???n/huy???n
                </InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-district"
                  label="Qu???n/huy???n"
                >
                  {district.map((district,index)=>(
                   <MenuItem value={district.id} key={index}>{district.name}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>
          </div> */}

          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group ward">
              {/* <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel id="demo-simple-select-label">X??/ph?????ng</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-ward"
                  label="X??/ph?????ng"
                >
                  <MenuItem value={1}>Nam</MenuItem>
                  <MenuItem value={0}>N???</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                id="outlined-basic-5"
                variant="outlined"
                type="text"
                label="?????a ch??? c??? th???"
                {...register("address", { required: true})}
              />
              {errors?.address?.type === "required" && (
                  <p>H??y nh???p ?????a ch??? c??? th???</p>)}
            </div>
          </div>

          <div id="upload" className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Ch???n ???nh avatar
                  </Button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{ position: "relative" }}
                    >
                      <img src={image.data_url} alt="avatar-user" />
                      <div className="image-item__btn-wrapper">
                        <i
                          className="fas fa-edit"
                          onClick={() => onImageUpdate(index)}
                          title="Ch???nh s???a"
                        ></i>
                        <i
                          className="fas fa-backspace btn-close"
                          onClick={() => onImageRemove(index)}
                          title="X??a"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>

          <div className="userbox col-lg-12" style={{ marginLeft: "27%" }}>
            <div className="input-group register">
            <Button
                  variant="primary"
                  className="btnRegister"
                  type="submit"
                  // onClick={onSubmit}
                >
                  ????ng k??
                </Button>
                <Backdrop
                  open={open}
                  className="backdrop-mui"
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
            </div>
          </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
