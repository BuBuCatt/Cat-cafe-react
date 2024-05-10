import http from "../http-common";

class AuthService{
    register(user){
        console.log("sending user data to register on backend");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/register`,
            user
        );
    }

    login(user){
        console.log("sending user email and password to login on backend");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/login`,
            user
        );
    }

    logout(data){
        console.log("sending user sessionId to end session on backend");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/logout`,
            data
        );
    }
}

export default new AuthService();