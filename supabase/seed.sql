-- Sample seed data for the parts table
INSERT INTO parts (part_number, name, description, category, car_make, car_model, car_year, price, stock_quantity)
VALUES
  ('TY-BRK-001', 'Front Brake Pads', 'OEM quality front brake pads for smooth and reliable stopping.', 'Brakes', 'Toyota', 'Camry', '2020', 45.99, 25),
  ('TY-BRK-002', 'Rear Brake Discs', 'Premium ventilated rear brake discs for improved heat dissipation.', 'Brakes', 'Toyota', 'Corolla', '2019', 89.99, 12),
  ('HD-ENG-003', 'Oil Filter', 'High-performance oil filter for extended engine life.', 'Filters', 'Honda', 'Civic', '2021', 12.50, 50),
  ('HD-ENG-004', 'Air Filter', 'Replacement air filter for optimal engine breathing.', 'Filters', 'Honda', 'CR-V', '2022', 18.00, 35),
  ('NI-SUS-005', 'Front Shock Absorber', 'Gas-charged front shock absorber for a comfortable ride.', 'Suspension', 'Nissan', 'Altima', '2018', 120.00, 8),
  ('NI-SUS-006', 'Rear Coil Spring', 'Heavy-duty rear coil spring for load support.', 'Suspension', 'Nissan', 'Pathfinder', '2020', 75.00, 15),
  ('BM-ELE-007', 'Alternator', 'Remanufactured alternator with 18-month warranty.', 'Electrical', 'BMW', '3 Series', '2017', 220.00, 5),
  ('BM-ELE-008', 'Starter Motor', 'OEM starter motor for reliable engine starting.', 'Electrical', 'BMW', '5 Series', '2019', 180.00, 4),
  ('FD-TRN-009', 'Automatic Transmission Filter Kit', 'Complete filter and gasket kit for automatic transmission service.', 'Transmission', 'Ford', 'F-150', '2021', 35.00, 20),
  ('FD-COL-010', 'Radiator', 'Aluminium core radiator for efficient engine cooling.', 'Cooling', 'Ford', 'Mustang', '2020', 155.00, 7);
