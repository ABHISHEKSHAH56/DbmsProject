import axios from 'axios'; 
const API = axios.create({ baseURL: `http://localhost:4000`, withCredentials: true }) //instance of axios for working with public APIS 
const Protected = axios.create({ baseURL: `http://localhost:4000`, withCredentials: true }) //instance of axios for working with protected APIS where accesstoken is required on each request

Protected.interceptors.request.use(
  (config) => {

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error.response.data.error)
    Promise.reject(error);
  }


);

//if response have error means access token expired
// then this function will use to recreate the access
// token and call the previous query 

Protected.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // let dispatch =useDispatch()
    // const {user}=useSelector(state=>({...state}))
    const originalRequest = error.config;
    //   let refreshToken = Cookies.get("refresh");
    //   console.log(refreshToken)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Protected
        .post(`/auth/refresh-token`, {}, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);

            //name ---> jwt expired --> auth-refresh-token -->set it to localStorage --> run originalRequest
            // dispatch({
            //   type:"LOGGED_IN_USER",
            //   payload:{...user,accessToken:res.data.accessToken}
            // })
            console.log("Access token refreshed!");
            return Protected(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);



export const SignUp = (formdata) => API.post('/auth/register', formdata)
export const LogIn = async (formdata) => await API.post('/auth/login', formdata)
export const authCheck = async () => await Protected.get("/")
export const logout = async () => await Protected.get("/auth/logout")

//student registeration 
export const StudentRegister = async (formdata) => await Protected.post('/student/register', formdata)
//faculty Registeration 
export const FacultyRegister = async (formdata) => await Protected.post('/faculty/register', formdata)

export const fetchallcourse=async()=>await API.get("/all/course")

export const fetchCourse=async() =>await Protected.get("/faculty/course/fetch")
export const createCourse=async(data) =>await Protected.post("/faculty/course/create",data)
export const deleteCourse=async(id)=>await Protected.delete(`/faculty/course/${id}`)
export const updateCourse=async(id)=>await Protected.patch(`/faculty/course/${id}`)
export const detailsCourse=async(id)=>await Protected.get(`/faculty/course/${id}`)


//assigment
export const fetchUnenrolled=async()=> await Protected.get("/student/course/all")
export const joinedthecourse=async(id)=>await Protected.get(`/student/course/join/${id}`)
export const createAssigment=async(data,id) =>await Protected.post(`/faculty/${id}/assigment/create`,data)
export const fetchAllAssigmen=async(id) =>await Protected.get(`/all/assigment/${id}`)
export const detailsAssigment=async(id)=>await Protected.get(`/faculty/assigment/details/${id}`)

//sumit the assigment
export const submitAssigment=async(data,id)=>await Protected.post(`/student/assigment/submission/${id}`,data)
export const fetchStudentCourse=async()=>await Protected.get('/student/listAssociatedcourse')
