import React from 'react';
import { StyledDashboard } from './Dashboard.styles';
import Card from '../../organisms/Card/Card';

const Dashboard = ({ boards }) => {
  return (
      <StyledDashboard className="Dashboard">
        {
          boards && boards.length > 0 && boards.map(board => {
            return (
              <Card key={board} link={`/boards/${board}`}>
                <h3>{`Board: ${board}`}</h3>
              </Card>
            )
          })
        }
      </StyledDashboard>
  )
}

export default Dashboard;
