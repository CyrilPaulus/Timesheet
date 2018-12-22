import { Component, OnInit } from '@angular/core';
import { Prestation, PrestationService } from '../core/prestation.service';
import { UserService, User } from '../core/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {

  public currentYear: number = 2018;
  public currentMonth: Month;

  public weeks: Week[] = [];
  public user: User;
  public users: User[];
  public years: number[] = [];

  public months = [
    new Month('Janvier', 0),
    new Month('Février', 1),
    new Month('Mars', 2),
    new Month('Avril', 3),
    new Month('Mai', 4),
    new Month('Juin', 5),
    new Month('Juillet', 6),
    new Month('Août', 7),
    new Month('Septembre', 8),
    new Month('Octobre', 9),
    new Month('Novembre', 10),
    new Month('Décembre', 11)
  ];


  constructor(
    private userService: UserService,
    private presationService: PrestationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      let userCode = params['user'];
      this.userService.getAll().subscribe(users => {
        this.users = users;
        if (!userCode)
          this.user = users[0];
        else
          this.user = users.find(x => x.code.toLowerCase() === userCode.toLowerCase());

        this.years = this.getYears(this.user);
        let currentYear = params['year'];
        if (!currentYear)
          currentYear = new Date().getFullYear();
        else
          currentYear = parseInt(currentYear);
        this.currentYear = currentYear;
        if (!this.years.find(x => x == currentYear))
          this.currentYear = this.years[0];

        let month = params['month'];
        if (!month) {
          var d = new Date();
          month = d.getMonth();
        } else {
          month = parseInt(month) - 1;
        }


        this.selectMonth(this.months.find(x => x.index == month));
      });
    });
  }

  public getYears(user: User): number[] {
    let rtn = [];
    for (let i = new Date().getFullYear(); i >= user.creationDate.getFullYear() - 1; i--) {
      rtn.push(i);
    }
    return rtn;
  }

  public onUserChanged() {
    this.router.navigateByUrl(`/prestations/${this.user.code}/${this.currentYear}/${this.currentMonth.index + 1}`);
  }

  public onCurrentYearChanged() {
    this.router.navigateByUrl(`/prestations/${this.user.code}/${this.currentYear}/${this.currentMonth.index + 1}`);
  }

  public selectMonth(month: Month) {
    this.currentMonth = month;
    this.refreshDays();
  }

  public getColor(month: Month) {
    if (!this.currentMonth)
      return;

    if (month.index == this.currentMonth.index)
      return 'primary';

    return null;
  }

  private refreshDays() {
    this.weeks = this.getDays(this.currentMonth.index, this.currentYear);
    this.presationService.getByMonth(this.user.id, this.currentYear, this.currentMonth.index + 1).subscribe(prestations => {
      for (let prestation of prestations)
        this.addPrestation(prestation);
    })
  }

  private addPrestation(prestation: Prestation) {
    for (let week of this.weeks) {
      for (let day of week.days) {
        console.log(day.date.getDate());
        console.log(prestation.date.getDate());
        console.log(' ');
        if (day.date.getDate() == prestation.date.getDate())
          day.prestations.push(prestation);
      }
    }
  }

  public getDays(month: number, year: number): Week[] {

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
    let numberOfDays = new Date(year, month + 1, 0).getDate();

    var currentWeek = new Week([]);
    var weeks = [currentWeek];

    for (let day = 1; day <= numberOfDays; day++) {
      let date = new Date(year, month, day, 10);
      let dayOfWeek = date.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6)
        continue;

      let dayName = this.getDayName(dayOfWeek);

      if (dayOfWeek == 1 && currentWeek.days.length > 0) {
        currentWeek = new Week([]);
        weeks.push(currentWeek);
      }

      currentWeek.days.push(new Day(dayName, date, currentDay === day && currentMonth === month && currentYear === year));
    }

    return weeks;
  }

  public getDayName(day: number): string {
    switch (day) {
      case 0:
        return 'Dimanche';
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
    }
  }

  public getWeekNumber(week: Week): number {
    // Copy date so don't modify original
    let d = week.days[0].date;
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((<any>d - <any>yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }

  public getTotal(): number {
    let total = 0;
    for (let week of this.weeks) {
      for (let day of week.days)
        total += day.getTotalDuration();
    }
    return total;
  }

}

export class Month {
  public constructor(
    public name: string,
    public index: number
  ) {

  }
}

export class Day {
  public prestations: Prestation[] = [];
  public constructor(
    public name: string,
    public date: Date,
    public current: boolean
  ) {

  }

  public getTotalDuration(): number {
    let total = 0;
    for (let prestation of this.prestations)
      total = total + prestation.duration;

    return total;
  }
}

export class Week {
  public constructor(
    public days: Day[]
  ) {

  }
}