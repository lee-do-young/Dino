/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      status
      duration
      createTime
      players {
        items {
          id
          name
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      status
      duration
      createTime
      players {
        items {
          id
          name
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      status
      duration
      createTime
      players {
        items {
          id
          name
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      name
      distance
      game {
        id
        status
        duration
        createTime
        players {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
      id
      name
      distance
      game {
        id
        status
        duration
        createTime
        players {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
      id
      name
      distance
      game {
        id
        status
        duration
        createTime
        players {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
