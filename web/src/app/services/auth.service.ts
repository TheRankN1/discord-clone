import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataBaseInterface } from '../interfaces/user-data-base.interface';
import { GeneratorHelpers } from '../helpers/generator.helpers';

const USERS_LOCALSTORAGE_KEY = 'databaseUsers';
const USER_LOGGED_ID_KEY = 'loggedUserId';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users$: BehaviorSubject<Array<UserDataBaseInterface>> = new BehaviorSubject<Array<UserDataBaseInterface>>([]);
  public loggedUser$: BehaviorSubject<UserDataBaseInterface> = new BehaviorSubject<UserDataBaseInterface>({
    id: '',
    username: '',
    fullName: '',
    password: '',
    bgColor: ''
  });

  public addUser(username: string, password: string, name: string): boolean {
    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUsername: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return user.username === username;
    });
    if (!foundUsername) users.push({ id: GeneratorHelpers.uuid(), username, password, bgColor: GeneratorHelpers.color() });
    this.users$.next(users);
    localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users));

    return !!foundUsername;
  }

  public login(username: string, password: string): boolean {
    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUser: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return user.username === username && user.password === password;
    });
    if (foundUser) {
      localStorage.setItem(USER_LOGGED_ID_KEY, JSON.stringify(foundUser));
      this.loggedUser$.next(foundUser);
    }
    return !!foundUser;
  }

  public getUsersFromLocalStorage(): void {
    const users: string | null = localStorage.getItem(USERS_LOCALSTORAGE_KEY);
    this.users$.next(users ? JSON.parse(users) : []);
  }

  public getLoggedUserFromLocalStorage(): void {
    const user: string | null = localStorage.getItem(USER_LOGGED_ID_KEY);
    this.loggedUser$.next(user ? JSON.parse(user) : {});
  }

  public listenToUsersAndUpdateLocalStorage(): void {
    this.users$.subscribe({
      next: (users: Array<UserDataBaseInterface>) => {
        localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users));
      }
    });
  }
  public listenToDataBaseUserAndUpdateLocalStorage(): void {
    this.loggedUser$.subscribe({
      next: (user: UserDataBaseInterface) => {
        localStorage.setItem(USER_LOGGED_ID_KEY, JSON.stringify(user));
      }
    });
  }
}
