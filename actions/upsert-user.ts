"use server";

import { upsertUser } from "@/lib/actoin-helpers/user-service";
import { UserJSON } from "@clerk/nextjs/server";

export async function onUpsertUser(user: UserJSON) {
  try {
    await upsertUser(user);

    return { message: "User upsert successful" };
  } catch (error) {
    console.error("Insert User:", error);
    return null;
  }
}

/*
User Example
user: {
    backup_code_enabled: false,
    banned: false,
    create_organization_enabled: true,
    created_at: 1720667436945,
    delete_self_enabled: true,
    email_addresses: [ [Object] ],
    external_accounts: [ [Object] ],
    external_id: null,
    first_name: 'John',
    has_image: true,
    id: 'user_2j5CEE46YRF2oXj4dLpL9ARUwx6',
    image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yajVDRUtVa25WaHo4U2RmdHgyeE1uc2xiMFoifQ',
    last_active_at: 1720667436941,
    last_name: 'Soto',
    last_sign_in_at: null,
    locked: false,
    lockout_expires_in_seconds: null,
    mfa_disabled_at: null,
    mfa_enabled_at: null,
    object: 'user',
    passkeys: [],
    password_enabled: false,
    phone_numbers: [],
    primary_email_address_id: 'idn_2j5CCjeJE2NPAK1NOzBezt1YOwS',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://images.clerk.dev/oauth_google/img_2j5CEKUknVhz8Sdftx2xMnslb0Z',
    public_metadata: {},
    saml_accounts: [],
    totp_enabled: false,
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 1720667437023,
    username: 'chito165',
    verification_attempts_remaining: 100,
    web3_wallets: []
  }

*/
