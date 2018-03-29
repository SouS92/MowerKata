import { Injectable } from '@angular/core';
import { Grid  } from '../model/grid.model';
import { Mower } from '../model/mower.model';
@Injectable()
export class MowerLogicService {

    parseActions(mowerPositionLine: any, mowerActions: any, grid: Grid): Mower {

        let mower: Mower = new Mower(mowerPositionLine[0], mowerPositionLine[1],
          mowerPositionLine[0], mowerPositionLine[1], mowerPositionLine[2], mowerPositionLine[2]);
        const actions = mowerActions.split('');

        for (let _j = 0; _j < actions.length; _j++) {

          mower = this.executeAction(mower, actions[_j], grid);
        }
        return mower;
      }

    executeAction(mower: Mower, action: string, grid: Grid): Mower {
        const tempMower = mower;
        switch (action) {
          case 'L': mower = this.changePositionL(tempMower); break;
          case 'R': mower = this.changePositionR(tempMower); break;
          case 'M': mower = this.executeMove(grid, tempMower); break;
          case 'G': mower = this.changePositionL(tempMower); break;
          case 'D': mower = this.changePositionR(tempMower); break;
          case 'A': mower = this.executeMove(grid, tempMower); break;
        }
        return tempMower;
      }

    executeMove(grid: Grid, mower: Mower): Mower {
        const newMower = mower;
        switch (mower.position) {
          case 'N': if (mower.positionY + 1 <= grid.y) { mower.positionY++; } break;
          case 'E': if (mower.positionX + 1 <= grid.x) { mower.positionX++; } break;
          case 'W': if (mower.positionX - 1 >= 0) { mower.positionX--; } break;
          case 'S': if (mower.positionY - 1 >= 0) { mower.positionY--; } break;
        }
        return newMower;
      }
      changePositionL(mower: Mower): Mower {
        switch (mower.position) {
          case 'N': mower.position = 'W'; break;
          case 'E': mower.position = 'N'; break;
          case 'W': mower.position = 'S'; break;
          case 'S': mower.position = 'E'; break;
        }
        return mower;
      }
      changePositionR(mower: Mower): Mower {
        switch (mower.position) {
          case 'N': mower.position = 'E'; break;
          case 'E': mower.position = 'S'; break;
          case 'W': mower.position = 'N'; break;
          case 'S': mower.position = 'W'; break;
        }
        return mower;
      }
}
