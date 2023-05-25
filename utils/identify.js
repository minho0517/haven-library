
class identify  {
    constructor(body) {
        this.body = body;
    }

    nextweek() {

        const today = this.body;
        const nextWeek = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        var year = nextWeek.getFullYear();
        var month = nextWeek.getMonth() + 1;
        var day = nextWeek.getDate();

        if (month < 10) {
            month = "0" + month;
        }
    
        if (day < 10) {
            day = "0" + day;
        }
    
        const newDate = year + "." + month + "." + day;
        return newDate;
    }

    newDate() {
        const date = this.body;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10) {
            month = "0" + month;
        }
    
        if (day < 10) {
            day = "0" + day;
        }
    
        const newDate = year + "." + month + "." + day;
        return newDate;
    }

    
}

export {identify}