import { Injectable } from '@angular/core';
import { ServerInterface } from '../interfaces/server.interface';
import { BehaviorSubject } from 'rxjs';
import { CategoryInterface } from '../interfaces/category.interface';
import { GeneratorHelpers } from '../helpers/generator.helpers';
import { ServerInitialization } from '../helpers/server.initialization';
import { ChannelInterface } from '../interfaces/channel.interface';
import { ChannelTypeEnum } from '../enums/channel-type.enum';
import { AuthService } from './auth.service';
import { UserDataBaseInterface } from '../interfaces/user-data-base.interface';

const SERVER_LOCALSTORAGE_KEY = 'dataBaseServers';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  public currentServer$: BehaviorSubject<ServerInterface> = new BehaviorSubject<ServerInterface>(ServerInitialization.defaultServer());
  public currentCategory$: BehaviorSubject<CategoryInterface> = new BehaviorSubject<CategoryInterface>(
    ServerInitialization.defaultCategory()
  );
  public currentChannel$: BehaviorSubject<ChannelInterface> = new BehaviorSubject<ChannelInterface>(ServerInitialization.defaultChannel());
  public isCategoryModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public servers$: BehaviorSubject<Array<ServerInterface>> = new BehaviorSubject<Array<ServerInterface>>([]);
  public loggedUserServers$: BehaviorSubject<Array<ServerInterface>> = new BehaviorSubject<Array<ServerInterface>>([]);

  constructor(private _authService: AuthService) {}

  public addServer(title: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;
    const users: Array<UserDataBaseInterface> = this._authService.users$.value;

    servers.push({
      id: GeneratorHelpers.uuid(),
      title: title,
      isActive: false,
      serverBgColor: GeneratorHelpers.color(),
      categories: [],
      createdBy: this._authService.loggedUser$.value?.id || '',
      createdOn: new Date()
    });

    if (loggedUser) {
      loggedUser.servers.push(servers[servers.length - 1]?.id);
      users.forEach((user, index) => {
        if (user.id === loggedUser.id) {
          users[index].servers = loggedUser.servers;
        }
      });
    }

    this.filterTheLoggedUserServers();
    this._authService.loggedUser$.next(loggedUser);
    this._authService.users$.next(users);
    this.servers$.next(servers);
  }

  public filterTheLoggedUserServers(): void {
    const loggedUserServers: Array<ServerInterface> = this.servers$.value.filter(
      (server: ServerInterface) =>
        server.createdBy === this._authService.loggedUser$.value?.id || this._authService.loggedUser$.value?.servers.includes(server.id)
    );
    this.loggedUserServers$.next(loggedUserServers);
  }

  public joinServer(server: ServerInterface): void {
    const loggedUserServers = this.loggedUserServers$.value;
    const loggedUser = this._authService.loggedUser$.value;

    if (loggedUser) {
      server.createdBy = loggedUser.id;
    }

    if (loggedUser) {
      loggedUser.servers.push(server.id);
    }

    loggedUserServers.push(server);
    this._authService.loggedUser$.next(loggedUser);
    this.loggedUserServers$.next(loggedUserServers);
  }

  public addCategory(category: string, serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;

    const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === serverId);

    if (!foundServer) {
      return;
    }

    foundServer.categories.push({
      title: category,
      id: GeneratorHelpers.uuid(),
      channels: []
    });
    this.servers$.next(servers);
  }

  public addChannel(name: string, serverId: string, categoryId: string, type: ChannelTypeEnum): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);

    if (!foundCategory) {
      return;
    }

    foundCategory.channels.push({ title: name, id: GeneratorHelpers.uuid(), type: type });
    this.servers$.next(servers);
  }

  public editServer(title: string, serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }
    foundServer.title = title;
    this.currentServer$.next({ ...foundServer });
    this.servers$.next(servers);
  }

  public deleteServer(serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    servers.splice(servers.indexOf(foundServer), 1);
    this.servers$.next(servers);
  }

  public editCategory(title: string, serverId: string, categoryId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }
    foundCategory.title = title;
    this.servers$.next(servers);
  }

  public deleteCategory(serverId: string, categoryId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }
    foundServer.categories.splice(foundServer.categories.indexOf(foundCategory), 1);
    this.servers$.next(servers);
  }

  public editChannel(name: string, serverId: string, categoryId: string, channelId: string, type: ChannelTypeEnum): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }

    const foundChannel: ChannelInterface | undefined = foundCategory.channels.find(channel => channel.id === channelId);
    if (!foundChannel) {
      return;
    }

    foundChannel.title = name;
    foundChannel.type = type;
    this.servers$.next(servers);
  }

  public deleteChannel(serverId: string, categoryId: string, channelId: string) {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }

    const foundChannel: ChannelInterface | undefined = foundCategory.channels.find(channel => channel.id === channelId);
    if (!foundChannel) {
      return;
    }

    foundCategory.channels.splice(foundCategory.channels.indexOf(foundChannel), 1);
    this.servers$.next(servers);
  }

  public setCurrentServer(id: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;

    const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === id);
    if (foundServer) {
      servers.forEach((server: ServerInterface) => {
        server.isActive = server.id === id;
      });
      this.currentServer$.next({ ...foundServer });
      this.servers$.next(servers);
    }
  }

  public getServersFromLocalStorage(): void {
    const servers: string | null = localStorage.getItem(SERVER_LOCALSTORAGE_KEY);
    this.servers$.next(servers ? JSON.parse(servers) : []);
  }

  public makeAllServerInactive(): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    servers.forEach(server => (server.isActive = false));
    this.servers$.next(servers);
  }

  public listenToServersAndUpdateLocalStorage(): void {
    this.servers$.subscribe({
      next: (servers: Array<ServerInterface>) => {
        localStorage.setItem(SERVER_LOCALSTORAGE_KEY, JSON.stringify(servers));
      }
    });
  }
}
