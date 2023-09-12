import { GeneratorHelpers } from '../helpers/generator.helpers';
import { UserCategoryInterface } from '../interfaces/user-category.interface';

export const USERS_MOCK: Array<UserCategoryInterface> = [
  {
    categoryName: 'Programmer',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: 'Se joaca acum : Roblox',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      },
      {
        id: '1',
        name: 'Gigel',
        status: 'offline',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      }
    ]
  },
  {
    categoryName: 'Bakery',
    users: [
      {
        id: '1',
        name: 'Matei',
        status: 'doNotDisturb',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      }
    ]
  },
  {
    categoryName: 'Man of the server',
    users: [
      {
        id: '1',
        name: 'Teodor',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      }
    ]
  },
  {
    categoryName: 'Most active users',
    users: [
      {
        id: '1',
        name: 'Ianis',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      },
      {
        id: '1',
        name: 'Gabriel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Round&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=Overall&clotheColor=Red&eyeType=Cry&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=DarkBrown'
      },
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Overall&clotheColor=Blue02&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Tanned'
      }
    ]
  },
  {
    categoryName: 'Striker',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      }
    ]
  },
  {
    categoryName: 'Player',
    users: [
      {
        id: '1',
        name: 'Rares',
        status: 'online',
        activity: 'Se joaca acum : League Of Legends',
        userBgColor: GeneratorHelpers.color(),
        avatar: ''
      }
    ]
  }
];