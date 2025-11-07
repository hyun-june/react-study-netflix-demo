import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';


// 홈페이지 /
// 영화 전체보여주는 페이지(서치) /movies
// 영화 디테일 페이지 /movies/:id
// <Route index element={<Homepage/>} /> index는 path="/"를 의미

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>} /> 
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<MovieDetailPage/>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>     
      </Routes>
    </div>
  );
}

export default App;
