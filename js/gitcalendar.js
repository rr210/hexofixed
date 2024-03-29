var calendar = new Vue({
    el: '#calendar',
    data: {
        user: 'Rr210',
        fixed: 'fixed',
        px: 'px',
        x: '',
        y: '',
        span1: '',
        span2: '',
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthchange: [],
        oneyearbeforeday: '',
        thisday: '',
        amonthago: '',
        aweekago: '',
        weekdatacore: 0,
        datacore: 0,
        total: 0,
        datadate: '',
        data: [],
        firstweek: [],
        lastweek: [],
        beforeweek: [],
        thisweekdatacore: 0,
        mounthbeforeday: 0,
        mounthfirstindex: 0,
        crispedges: 'crispedges',
        thisdayindex: 0,
        amonthagoindex: 0,
        amonthagoweek: [],
        firstdate: [],
        first2date: [],
        montharrbefore: [],
        monthindex: 0,
        purple: ['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f', ],
        green: ['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620'],
        blue: ['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c', ],
        sgresen: ['#ebedf0', '#ABEFE2', '#90DACB', '#7ACFBE', '#69CAB7', '#55BFAA', '#46AA96', '#349A86', '#217A69', '#166555', '#064539'],
        color: ['#ebedf0', '#ABEFE2', '#90DACB', '#7ACFBE', '#69CAB7', '#55BFAA', '#46AA96', '#349A86', '#217A69', '#166555', '#064539']
    },
    methods: {
        selectStyle(data, event) {
            $('.angle-wrapper').show();
            this.span1 = data.date;
            this.span2 = data.count;
            this.x = event.clientX - 100;
            this.y = event.clientY - 60;
        }, outStyle() {
            $('.angle-wrapper').hide();
        }, thiscolor(x) {
            if (x === 0) {
                let i = parseInt(x / 2);
                return this.color[0]
            } else if (x < 2) {
                return this.color[1]
            } else if (x < 20) {
                let i = parseInt(x / 2);
                return this.color[i]
            } else {
                return this.color[9]
            }
        },
    }
})
var githubapiurl = "https://py-gitcalendar.vercel.app/api?/" + calendar.user
$(function () {
    $.ajax({
        type: "GET",
        url: githubapiurl,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {}, success: function (data) {
            calendar.data = data.contributions;
            calendar.total = data.total;
            calendar.first2date = calendar.data[48];
            calendar.firstdate = calendar.data[47];
            calendar.firstweek = data.contributions[0];
            calendar.lastweek = data.contributions[52];
            calendar.beforeweek = data.contributions[51];
            calendar.thisdayindex = calendar.lastweek.length - 1;
            calendar.thisday = calendar.lastweek[calendar.thisdayindex].date;
            calendar.oneyearbeforeday = calendar.firstweek[0].date;
            calendar.monthindex = calendar.thisday.substring(5, 7) * 1;
            calendar.montharrbefore = calendar.month.splice(calendar.monthindex, 12 - calendar.monthindex);
            calendar.monthchange = calendar.montharrbefore.concat(calendar.month);
            addweek();
            addlastmonth();

            function addlastmonth() {
                if (calendar.thisdayindex === 0) {
                    thisweekcore(52);
                    thisweekcore(51);
                    thisweekcore(50);
                    thisweekcore(49);
                    thisweekcore(48);
                    calendar.thisweekdatacore += calendar.firstdate[6].count
                    calendar.amonthago = calendar.firstdate[6].date
                } else {
                    thisweekcore(52);
                    thisweekcore(51);
                    thisweekcore(50);
                    thisweekcore(49);
                    thisweek2core();
                    calendar.amonthago = calendar.first2date[calendar.thisdayindex - 1].date;
                }
            };

            function thisweek2core() {
                for (let i = calendar.thisdayindex - 1; i < calendar.first2date.length; i++) {
                    calendar.thisweekdatacore += calendar.first2date[i].count;
                }
            };

            function thisweekcore(index) {
                for (let item of calendar.data[index]) {
                    calendar.thisweekdatacore += item.count;
                }
            };

            function addlastweek() {
                for (let item of calendar.lastweek) {
                    calendar.weekdatacore += item.count;
                }
            };

            function addbeforeweek() {
                for (let i = calendar.thisdayindex; i < calendar.beforeweek.length; i++) {
                    calendar.weekdatacore += calendar.beforeweek[i].count;
                }
            };

            function addweek() {
                if (calendar.thisdayindex === 6) {
                    calendar.aweekago = calendar.lastweek[0].date;
                    addlastweek();
                } else {
                    lastweek = data.contributions[51];
                    calendar.aweekago = lastweek[calendar.thisdayindex + 1].date;
                    addlastweek();
                    addbeforeweek();
                };
            }
        }
    });
});