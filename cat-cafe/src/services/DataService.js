import http from "../http-common";
class DataService{
    getData(dataPath){
        console.log("reading "+dataPath+" from database");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    addData(dataPath, data){
        console.log("posting new data on "+dataPath+" database");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            data
        );
    }

    editData(dataPath, data){
        console.log("editing "+dataPath+" from database");
        return http.put(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                },
                body: {
                    data: data
                }
            }
        );
    }

    removeData(dataPath, id){
        console.log("deleting "+dataPath+" from database");
        // return 'Item removed';
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}/${id}`
        );
    }

    reloadData(type,setFunction, setError){
        this.getData(type).then(
            (response)=>{
                setFunction(response.data);// Set menu state with loaded data in menu -> menu
                console.log("Data from mysql : " + response.data);
            },
            (rej)=>{
                console.log(rej);// Log errors if file reading fails
                setError(rej.message || "An error occurred while getting the menu from data base.");
            }
        )
    }
}

export default new DataService();