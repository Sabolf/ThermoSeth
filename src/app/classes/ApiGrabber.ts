export class ApiGrabber {

    public static test() {
        return "x";
    }

    private static apiUrl = "https://sethbolf.com/API_SERVERS/thermo_server/?action=";

    private static callAPI(urlPath:String, callback:any) {
        fetch( ApiGrabber.apiUrl +  urlPath, {
            method:"GET"
        })
        .then(response => response.json())
        .then( response=>
            callback(response)
        )
    }
    public static async getAllDevices(callback:any) {
        ApiGrabber.callAPI("list", callback);
    }

    public static async getDeviceTemp(deviceId: number, callback: any) {
        ApiGrabber.callAPI(`temps&id=${deviceId}`, callback);
    }
}