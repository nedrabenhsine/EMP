import axios from "axios"
import { useState } from "react"
import jwt_decode from "jwt-decode";

export default () => {

    const [data,setData]  = useState({username:"", password:""})
    const handleChange =({currentTarget:input})=>{
        setData({...data, [input.name]:input.value})
      }
      
      console.log(data)
      const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:5000/auth/login`,data).then(res => {
           
            console.log("res of : ",res.data.access_token)
            var decoded = jwt_decode(res.data.access_token);
             console.log(decoded.role)
          ///  localStorage.setItem("token",res.data.access_token)
            setData(res.data);
           if(decoded.role=="admin") {
            window.location ="/dashboard"

           }
          }).catch(err=>{
            console.log(err.response)
          })
      }





    return (
        <>
            <div>
            
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-75">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                        <div className="card card-plain mt-8">
                                            <div className="card-header pb-0 text-left bg-transparent">
                                            <img class="size-96 company-logo bg-white" alt="company logo" _v-ab01d028="" src="https://img.jobi.tn/0796ce39-f07d-bf64-07c0-d2eb7c00ca22/version/crop/50x50/0-0/"/>
                                                <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                                <p className="mb-0">Enter votre email et mot de passe pour sign in</p>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit} >
                                                    <label> nom d'utilisateur</label>
                                                    <div className="mb-3">
                                                        <input type="username" className="form-control" placeholder="username" aria-label="username"  name="username" onChange={handleChange} />
                                                    </div>
                                                    <label>mot de passe</label>
                                                    <div className="mb-3">
                                                        <input type="password" className="form-control" placeholder="Password"   name="password" onChange={handleChange} />
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                <p className="mb-4 text-sm mx-auto">
                                                    Don't have an account?
                                                    <a href="javascript:;" className="text-info text-gradient font-weight-bold">Sign up</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </>
    )
}