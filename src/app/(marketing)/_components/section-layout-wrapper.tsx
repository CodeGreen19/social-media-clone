import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { Fragment, useState } from "react";

type AccountSectionTriggers = {
  onOpen?: () => void;
  onClose?: () => void;
};
type SectionTriggerComponentType =
  ({}: AccountSectionTriggers) => React.JSX.Element;
type SectionFormComponentType =
  ({}: AccountSectionTriggers) => React.JSX.Element;
type SectionNormalComponentType = () => React.JSX.Element;

type SectionComponentType = {
  title: string;
  FormComponent?: SectionFormComponentType;
  TriggerComponent?: SectionTriggerComponentType;
  NormalComponent?: SectionNormalComponentType;
};
type SectionInfoType = {
  heading: string;
  sections: SectionComponentType[];
};

function SectionLayoutWrapper({ heading, sections }: SectionInfoType) {
  return (
    <div className="space-y-4">
      <h1 className="font-medium">{heading}</h1>

      {sections.map(
        ({ title, FormComponent, NormalComponent, TriggerComponent }) => (
          <Fragment key={title}>
            <Separator />
            <div className="md:grid md:grid-cols-[1fr_1.8fr] space-y-2 md:space-y-0">
              <h2>{title}</h2>
              {FormComponent && TriggerComponent ? (
                <ClickExpandActionBox
                  FormComponent={FormComponent}
                  TriggerComponent={TriggerComponent}
                />
              ) : NormalComponent ? (
                <NormalComponent />
              ) : null}
            </div>
          </Fragment>
        )
      )}
    </div>
  );
}
function ClickExpandActionBox({
  FormComponent,
  TriggerComponent,
}: Required<Pick<SectionComponentType, "FormComponent" | "TriggerComponent">>) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      {open ? (
        <Card>
          <CardContent>
            <FormComponent onClose={() => setOpen(false)} />
          </CardContent>
        </Card>
      ) : (
        <div>
          <TriggerComponent onOpen={() => setOpen(true)} />
        </div>
      )}
    </Fragment>
  );
}

function SectionActionButtons({
  onClose,
  buttonText,
  buttonSubmit,
  buttonType,
  isPending,
}: {
  onClose?: () => void;
  buttonText: string;
  buttonType: "button" | "submit";
  buttonSubmit?: () => void;
  isPending?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant={"outline"} onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={isPending} type={buttonType} onClick={buttonSubmit}>
        {buttonText}
      </Button>
    </div>
  );
}

export {
  SectionActionButtons,
  SectionLayoutWrapper,
  type AccountSectionTriggers,
};
