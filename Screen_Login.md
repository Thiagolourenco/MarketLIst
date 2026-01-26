## Screen Login

1 - Create Componnets

- Button, and your variants
- TextInput Generic
- Text - Crete a component called Typography

## Styles

/_ onb1-image-area_001 _/

/_ Auto layout _/
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 387px;
height: 437.25px;

/_ Inside auto layout _/
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;

--- Content ---

Indicator

Is not active: Styles
/_ Background _/

width: 8px;
height: 8px;

background: #E5E7EB;
border-radius: 9999px;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;

Is active
/_ Background _/

width: 32px;
height: 8px;

background: #34C759;
border-radius: 9999px;

/_ Inside auto layout _/
flex: none;
order: 1;
flex-grow: 0;

---

Badge - When have

/_ feature-badge_010 _/

/_ Auto layout _/
display: flex;
flex-direction: column;
align-items: center;
padding: 6px 16px;

width: 162.16px;
height: 28px;

background: #EAFBF1;
border-radius: 9999px;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;

Badge Text STyle
/_ Text _/

width: 130.16px;
height: 16px;

font-family: 'Nimbus Sans';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 16px;
/_ identical to box height, or 133% _/
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.3px;
text-transform: uppercase;

color: #34C759;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;

---- Text Title -----
/_ Text _/

width: 255.06px;
height: 38px;

font-family: 'Nimbus Sans';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 38px;
/_ identical to box height, or 125% _/
display: flex;
align-items: center;
text-align: center;

color: #1F2937;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;

----- Text Description -----
/_ Container _/

/_ Auto layout _/
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 6.27px 0px 6.25px;

position: absolute;
width: 323px;
height: 88px;
left: calc(50% - 323px/2);
top: 96.75px;

# Buttons

-> Primary
/_ Button _/

/_ Auto layout _/
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 323px;
height: 56px;

background: #34C759;
box-shadow: 0px 10px 15px -3px rgba(34, 197, 94, 0.2), 0px 4px 6px -4px rgba(34, 197, 94, 0.2);
border-radius: 16px;

/_ Inside auto layout _/
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;

Text: /_ Text _/

width: 77.98px;
height: 28px;

font-family: 'Nimbus Sans';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/_ identical to box height, or 156% _/
display: flex;
align-items: center;
text-align: center;

color: #FFFFFF;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;

Seconda - Skip

/_ Button _/

/_ Auto layout _/
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 323px;
height: 56px;

/_ Inside auto layout _/
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;

Text
/_ Text _/

width: 31.22px;
height: 24px;

font-family: 'Nimbus Sans';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
/_ identical to box height, or 150% _/
display: flex;
align-items: center;
text-align: center;

color: #6B7280;

/_ Inside auto layout _/
flex: none;
order: 0;
flex-grow: 0;
