import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable, Form, Pagination, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const Table = ({
  columns,
  data,
  sortable = true,
  pagination = true,
  searchable = false,
  selectable = false,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  emptyMessage = 'No data available',
  striped = true,
  hover = true,
  bordered = false,
  responsive = true,
  className,
  onRowClick,
  onSelectionChange,
  rowKey = 'id',
  ...props
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Filter and sort data
  const getProcessedData = () => {
    let processedData = [...data];
    
    // Apply search if searchable is enabled
    if (searchable && searchTerm) {
      const term = searchTerm.toLowerCase();
      processedData = processedData.filter(item => 
        columns.some(column => {
          const value = column.selector ? column.selector(item) : item[column.field];
          return value && String(value).toLowerCase().includes(term);
        })
      );
    }
    
    // Apply sorting if a sort field is selected
    if (sortable && sortField) {
      const column = columns.find(col => col.field === sortField);
      
      processedData.sort((a, b) => {
        const aValue = column.selector ? column.selector(a) : a[sortField];
        const bValue = column.selector ? column.selector(b) : b[sortField];
        
        if (aValue === bValue) return 0;
        
        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc' 
          ? (aValue < bValue ? -1 : 1)
          : (bValue < aValue ? -1 : 1);
      });
    }
    
    return processedData;
  };
  
  const processedData = getProcessedData();
  
  // Calculate pagination
  const totalPages = pagination ? Math.ceil(processedData.length / rowsPerPage) : 1;
  const paginatedData = pagination 
    ? processedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : processedData;
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FontAwesomeIcon icon={faSort} opacity={0.3} size="sm" />;
    return sortDirection === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} size="sm" />
      : <FontAwesomeIcon icon={faSortDown} size="sm" />;
  };
  
  // Handle row selection
  const handleRowSelect = (rowId) => {
    const newSelectedRows = [...selectedRows];
    
    if (newSelectedRows.includes(rowId)) {
      const index = newSelectedRows.indexOf(rowId);
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(rowId);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onSelectionChange) {
      onSelectionChange(newSelectedRows);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(row => row[rowKey]));
    }
    
    setSelectAll(!selectAll);
    
    if (onSelectionChange) {
      onSelectionChange(selectAll ? [] : paginatedData.map(row => row[rowKey]));
    }
  };
  
  // Reset selected rows when data changes
  useEffect(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, [data]);
  
  // Reset current page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev" 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
    );
    
    // First page
    items.push(
      <Pagination.Item 
        key={1} 
        active={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Pagination.Item>
    );
    
    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }
    
    // Pages around current page
    for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page++) {
      items.push(
        <Pagination.Item 
          key={page} 
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    
    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }
    
    // Last page if not the first page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item 
          key={totalPages} 
          active={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    
    // Next button
    items.push(
      <Pagination.Next 
        key="next" 
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    );
    
    return items;
  };
  
  return (
    <div>
      {/* Table filters and actions */}
      {(searchable || pagination) && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          {searchable && (
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pe-4"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" 
                />
              </div>
            </div>
          )}
          
          {pagination && (
            <div className="d-flex align-items-center">
              <span className="me-2 text-muted small">Rows per page:</span>
              <Form.Select
                size="sm"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{ width: '80px' }}
              >
                {rowsPerPageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Form.Select>
            </div>
          )}
        </div>
      )}
      
      {/* Main table */}
      <div className={responsive ? 'table-responsive' : ''}>
        <BootstrapTable 
          striped={striped} 
          hover={hover} 
          bordered={bordered} 
          className={className}
          {...props}
        >
          <thead>
            <tr>
              {selectable && (
                <th className="text-center" style={{ width: '40px' }}>
                  <Form.Check
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map(column => (
                <th 
                  key={column.field} 
                  className={column.headerClassName || ''}
                  style={{
                    ...(column.width ? { width: column.width } : {}),
                    ...(sortable && column.sortable !== false ? { cursor: 'pointer' } : {}),
                    ...column.style
                  }}
                  onClick={() => {
                    if (sortable && column.sortable !== false) {
                      handleSort(column.field);
                    }
                  }}
                >
                  <div className="d-flex align-items-center">
                    {column.header || column.field}
                    {sortable && column.sortable !== false && (
                      <span className="ms-1">
                        {getSortIcon(column.field)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className="text-center py-4"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row[rowKey] || rowIndex} 
                  onClick={() => onRowClick && onRowClick(row)}
                  style={onRowClick ? { cursor: 'pointer' } : {}}
                >
                  {selectable && (
                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        checked={selectedRows.includes(row[rowKey])}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(row[rowKey]);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td 
                      key={column.field} 
                      className={column.cellClassName}
                      style={column.cellStyle}
                    >
                      {column.cell 
                        ? column.cell(row) 
                        : column.selector 
                          ? column.selector(row) 
                          : row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </BootstrapTable>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted small">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, processedData.length)} of {processedData.length} entries
          </div>
          <Pagination size="sm">
            {renderPaginationItems()}
          </Pagination>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      selector: PropTypes.func,
      cell: PropTypes.func,
      sortable: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string,
      style: PropTypes.object,
      cellStyle: PropTypes.object
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  searchable: PropTypes.bool,
  selectable: PropTypes.bool,
  rowsPerPageOptions: PropTypes.array,
  defaultRowsPerPage: PropTypes.number,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  bordered: PropTypes.bool,
  responsive: PropTypes.bool,
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  rowKey: PropTypes.string
};

export default Table;