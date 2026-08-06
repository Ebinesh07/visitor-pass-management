import { Table, Button, Badge } from "react-bootstrap";
import {
  FaPenToSquare,
  FaTrash,
  FaUserTie,
} from "react-icons/fa6";

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-responsive">

      <Table hover className="align-middle employee-table mb-0">

        <thead>

          <tr>

            <th>#</th>

            <th>Employee</th>

            <th>Employee ID</th>

            <th>Department</th>

            <th>Designation</th>

            <th>Status</th>

            <th className="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee, index) => (

            <tr key={employee._id}>

              <td>{index + 1}</td>

              <td>

                <div className="employee-info">

                  <div className="employee-avatar">

                    <FaUserTie />

                  </div>

                  <div>

                    <h6>

                      {employee.name}

                    </h6>

                    <span>

                      {employee.email}

                    </span>

                  </div>

                </div>

              </td>

              <td>

                <strong>

                  {employee.employeeId}

                </strong>

              </td>

              <td>

                {employee.department}

              </td>

              <td>

                {employee.designation}

              </td>

              <td>

                <Badge bg="success">

                  Active

                </Badge>

              </td>

              <td>

                <div className="action-buttons">

                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() =>
                      onEdit(employee)
                    }
                  >

                    <FaPenToSquare />

                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      onDelete(employee)
                    }
                  >

                    <FaTrash />

                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </Table>

    </div>
  );
};

export default EmployeeTable;