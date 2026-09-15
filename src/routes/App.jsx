import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.tsx'
import HomePage from '../features/movies/pages/HomePage'
import ExplorePage from '../features/movies/pages/ExplorePage'
import MovieDetailPage from '../features/movies/pages/MovieDetailPage'
import ActorDetailPage from '../features/movies/pages/ActorDetailPage'
import DirectorDetailPage from '../features/movies/pages/DirectorDetailPage'
import ProfilePage from '../features/auth/pages/ProfilePage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import LoginPage from '../features/auth/pages/LoginPage'
import ProtectedRoute from '../features/auth/context/ProtectedRoutes'
import FavoritesPage from '../features/favorites/pages/FavoritesPage.tsx'


export default function App(){

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/explore' element={<ExplorePage/>}/>
                <Route path='/favorites' element={<ProtectedRoute>
                                                    <FavoritesPage/>
                                                </ProtectedRoute>}/>
                <Route path='/profile' element={<ProtectedRoute>
                                                    <ProfilePage/>
                                                </ProtectedRoute> }/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/movie/:id' element={<MovieDetailPage/>}/>
                <Route path='/actor/:id' element={<ActorDetailPage/>}/>
                <Route path='/director/:id' element={<DirectorDetailPage/>}/> 
            </Route>
        </Routes>
    )
}