import { UserAddress } from "@prisma/client";

type PlayerAddressProps = {
  address: UserAddress | null;
};

export const PlayerAddress = ({ address }: PlayerAddressProps) => {
  return (
    <div>
      <span>Address:</span>
      <div>
        <span>City:</span>
        <p>{address?.city}</p>
      </div>
      <div>
        <span>State:</span>
        <p>{address?.state}</p>
      </div>
      <div>
        <span>Zip:</span>
        <p>{address?.zip}</p>
      </div>
      <div>
        <span>Street:</span>
        {address?.street}
      </div>
    </div>
  );
};
