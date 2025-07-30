-- Function to update team member order
CREATE OR REPLACE FUNCTION update_team_order(updates JSONB)
RETURNS VOID AS $$
DECLARE
  item JSONB;
BEGIN
  FOR item IN SELECT * FROM jsonb_array_elements(updates)
  LOOP
    UPDATE team_members
    SET order_index = (item->>'order_index')::INTEGER
    WHERE id = (item->>'id')::BIGINT;
  END LOOP;
END;
$$ LANGUAGE plpgsql; 